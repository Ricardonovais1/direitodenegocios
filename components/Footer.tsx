import Link from 'next/link'
import type { SiteData } from '@/types'

const navGroups = [
  { href: '/sobre', label: 'Sobre' },
  { href: '/areas-de-atuacao', label: 'Áreas de atuação' },
  { href: '/cursos', label: 'Cursos' },
  { href: '/blog', label: 'Blog' },
  { href: '/contato', label: 'Contato' },
]

const linkClass =
  'link-underline text-sm text-slate-400 transition-colors duration-300 hover:text-gold-light'

export default function Footer({ data }: { data: SiteData; locale?: string }) {
  const phoneHref = `tel:${data.phone.replace(/\D/g, '')}`

  return (
    <footer className="texture-grain relative overflow-hidden bg-navy-deep pb-8 pt-16 text-white">
      <div aria-hidden className="texture-weave-dark absolute inset-0" />
      <span aria-hidden className="rule-gold absolute inset-x-0 top-0" />

      <div className="container-fw relative">
        <div className="mb-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="mb-1 font-serif text-xl font-bold text-gold-light">{data.name}</h3>
            <p className="mb-4 text-[0.68rem] uppercase tracking-[0.22em] text-white/60">
              {data.tagline}
            </p>
            <p className="mb-5 text-sm leading-relaxed text-slate-400">
              Estratégia, tática e leitura de jogo para fazer negócios com mais eficiência e menos
              risco.
            </p>
            <a
              href="https://sceb.com.br"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-1.5 text-xs uppercase tracking-wider transition-all duration-500 ease-silk hover:-translate-y-0.5 hover:border-gold-light hover:text-gold-light"
            >
              SCEB — Escritório
              <span aria-hidden>↗</span>
            </a>
          </div>

          <div>
            <h4 className="mb-4 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-white/55">Áreas de atuação</h4>
            <ul className="space-y-2.5">
              {data.practiceAreas.filter((area) => area.slug).slice(0, 6).map((area) => (
                <li key={area._id}>
                  <Link href={`/areas-de-atuacao/${area.slug}`} className={linkClass}>
                    {area.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/areas-de-atuacao"
                  className="link-underline group text-sm font-bold text-gold-light"
                >
                  Ver todas
                  <span aria-hidden className="arrow-slide">
                    →
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-white/55">Navegação</h4>
            <ul className="space-y-2.5">
              {navGroups.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-white/55">Contato</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href={phoneHref} className={linkClass}>
                  {data.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${data.email}`} className={`${linkClass} break-all`}>
                  {data.email}
                </a>
              </li>
              <li className="text-sm leading-relaxed text-slate-400">{data.address}</li>
              {data.officeHours?.map((line) => (
                <li key={line} className="text-sm text-slate-400/90">
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-start sm:justify-between">
          <p className="max-w-3xl text-xs leading-relaxed text-slate-400">
            {data.footer.disclaimer}
          </p>
          <p className="shrink-0 text-xs text-slate-400">
            © {new Date().getFullYear()} {data.name}
          </p>
        </div>
      </div>
    </footer>
  )
}
