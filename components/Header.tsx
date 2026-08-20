'use client'

import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import ScrollProgress from './motion/ScrollProgress'

interface HeaderProps {
  name: string
  tagline: string
  phone?: string
  locale?: string
}

const navLinks = [
  { href: '/', label: 'Início' },
  { href: '/sobre', label: 'Sobre' },
  { href: '/areas-de-atuacao', label: 'Áreas de Atuação' },
  { href: '/cursos', label: 'Cursos' },
  { href: '/blog', label: 'Blog' },
  { href: '/contato', label: 'Contato' },
]

export default function Header({ name, tagline }: HeaderProps) {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const isHome = pathname === '/'

  const closeMenu = useCallback(() => setMenuOpen(false), [])

  // Header compacta e ganha contraste assim que a leitura começa.
  useEffect(() => {
    let frame = 0
    const check = () => {
      frame = 0
      setScrolled(window.scrollY > 24)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(check)
    }
    check()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  // Menu aberto trava a rolagem e responde ao Esc.
  useEffect(() => {
    if (!menuOpen) return
    document.body.dataset.scrollLocked = 'true'
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      delete document.body.dataset.scrollLocked
      window.removeEventListener('keydown', onKey)
    }
  }, [menuOpen])

  // Trocar de página fecha o menu.
  useEffect(() => setMenuOpen(false), [pathname])

  return (
    <header
      id="site-header"
      /* `backdrop-filter` ficou fora da transição de propósito: animar o raio do
         blur obriga o navegador a reamostrar o fundo a cada quadro justamente
         enquanto a página rola. A troca de cor já dá conta da mudança de estado. */
      className={`sticky top-0 z-50 border-b text-white transition-[background-color,border-color,box-shadow] duration-500 ease-silk ${
        scrolled || menuOpen
          ? 'border-white/10 bg-navy-dark/95 shadow-[0_10px_40px_-24px_rgba(0,0,0,0.9)] backdrop-blur-md'
          : 'border-transparent bg-navy/80 backdrop-blur-sm'
      }`}
    >
      <div
        className={`container-fw flex items-center justify-between gap-4 transition-[min-height] duration-500 ease-silk ${
          scrolled ? 'min-h-[64px]' : 'min-h-[76px]'
        }`}
      >
        <Link href="/" aria-label="Início" className="group flex shrink-0 flex-col leading-tight">
          <span className="font-serif text-xl font-bold transition-colors duration-500 group-hover:text-gold-light">
            {name}
          </span>
          <span className="mt-0.5 flex items-center gap-2 text-[0.66rem] uppercase tracking-[0.22em] text-gold-light/90">
            <span
              aria-hidden
              className="h-px w-4 bg-gold/70 transition-all duration-500 ease-silk group-hover:w-7"
            />
            {tagline}
          </span>
        </Link>

        <button
          aria-label={menuOpen ? 'Fechar navegação' : 'Abrir navegação'}
          aria-expanded={menuOpen}
          aria-controls="nav-menu"
          onClick={() => setMenuOpen((open) => !open)}
          className="flex h-11 w-11 shrink-0 flex-col items-center justify-center gap-1.5 rounded-xl border border-white/25 transition-colors duration-300 hover:border-gold/60 md:hidden"
        >
          <span
            className={`block h-0.5 w-5 origin-center bg-white transition-transform duration-400 ease-silk ${
              menuOpen ? 'translate-y-2 rotate-45' : ''
            }`}
          />
          <span
            className={`block h-0.5 w-5 bg-white transition-opacity duration-300 ${
              menuOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block h-0.5 w-5 origin-center bg-white transition-transform duration-400 ease-silk ${
              menuOpen ? '-translate-y-2 -rotate-45' : ''
            }`}
          />
        </button>

        {/* Navegação desktop */}
        <nav aria-label="Navegação principal" className="hidden items-center gap-7 md:flex">
          {navLinks.map(({ href, label }) => {
            const isActive = href === '/' ? isHome : pathname.startsWith(href)
            return (
              <Link
                key={href}
                href={href}
                aria-current={isActive ? 'page' : undefined}
                className={`group relative py-1 text-sm transition-colors duration-300 ${
                  isActive ? 'text-gold-light' : 'text-white/85 hover:text-white'
                }`}
              >
                {label}
                <span
                  aria-hidden
                  className={`absolute -bottom-0.5 left-0 h-px w-full origin-left bg-gold transition-transform duration-500 ease-silk ${
                    isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}
                />
              </Link>
            )
          })}

          <Link href="/contato" className="btn-gold min-h-[42px] px-5 text-[0.82rem]">
            Falar com o Dr. Fausto
          </Link>
        </nav>
      </div>

      <ScrollProgress />

      {/* Painel mobile.
          `inert` quando fechado: tira os links do Tab E da árvore de
          acessibilidade de uma vez — `max-h-0` só esconde visualmente. */}
      <div
        id="nav-menu"
        inert={!menuOpen || undefined}
        className={`overflow-hidden border-t border-white/10 bg-navy-dark transition-[max-height,opacity] duration-500 ease-silk md:hidden ${
          menuOpen ? 'max-h-[80vh] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav aria-label="Navegação principal (mobile)" className="container-fw flex flex-col py-4">
          {navLinks.map(({ href, label }, index) => {
            const isActive = href === '/' ? isHome : pathname.startsWith(href)
            return (
              <Link
                key={href}
                href={href}
                onClick={closeMenu}
                aria-current={isActive ? 'page' : undefined}
                style={{ transitionDelay: menuOpen ? `${80 + index * 45}ms` : '0ms' }}
                className={`flex items-center justify-between border-b border-white/[0.07] py-3.5 text-[0.95rem] transition-all duration-500 ease-silk ${
                  menuOpen ? 'translate-x-0 opacity-100' : '-translate-x-3 opacity-0'
                } ${isActive ? 'text-gold-light' : 'text-white/90'}`}
              >
                {label}
                <span aria-hidden className="text-gold/50">
                  →
                </span>
              </Link>
            )
          })}

          <Link href="/contato" onClick={closeMenu} className="btn-gold mt-5 w-full">
            Falar com o Dr. Fausto
          </Link>
        </nav>
      </div>
    </header>
  )
}
