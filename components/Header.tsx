'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

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
  const isHome = pathname === '/'

  const closeMenu = useCallback(() => setMenuOpen(false), [])

  return (
    <>
      <header id="site-header" className="sticky top-0 z-50 bg-navy/95 backdrop-blur-sm text-white border-b border-white/10">
        <div className="container-fw flex items-center justify-between gap-4 min-h-[72px]">
          <Link href="/" aria-label="Início" className="flex flex-col leading-tight shrink-0">
            <span className="font-serif text-xl font-bold">{name}</span>
            <span className="text-gold-light text-[0.7rem] uppercase tracking-widest mt-0.5">{tagline}</span>
          </Link>

          <button
            aria-label="Alternar navegação"
            aria-expanded={menuOpen}
            aria-controls="nav-menu"
            onClick={() => setMenuOpen((o) => !o)}
            className="md:hidden flex flex-col justify-center items-center w-11 h-10 border border-white/25 rounded-xl gap-1.5 shrink-0"
          >
            <span className={`block h-0.5 w-5 bg-white transition-transform origin-center ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block h-0.5 w-5 bg-white transition-opacity ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-0.5 w-5 bg-white transition-transform origin-center ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>

          <nav
            id="nav-menu"
            aria-label="Navegação principal"
            className={`absolute md:static top-[72px] left-[4%] right-[4%] bg-navy md:bg-transparent border md:border-0 border-white/15 rounded-2xl md:rounded-none p-4 md:p-0 flex-col md:flex-row items-start md:items-center gap-3 md:gap-4 ${menuOpen ? 'flex' : 'hidden md:flex'}`}
          >
            {navLinks.map(({ href, label }) => {
              const isActive = href === '/' ? isHome : pathname.startsWith(href)
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={closeMenu}
                  aria-current={isActive ? 'page' : undefined}
                  className="text-sm text-white hover:text-gold-light transition-colors aria-[current=page]:text-gold-light"
                >
                  {label}
                </Link>
              )
            })}

            <Link
              href="/contato"
              onClick={closeMenu}
              className="inline-flex items-center justify-center min-h-[42px] px-5 rounded-full bg-gold text-gray-900 font-extrabold text-sm hover:bg-gold-light transition-colors"
            >
              Falar com o Dr. Fausto
            </Link>
          </nav>
        </div>
      </header>
    </>
  )
}
