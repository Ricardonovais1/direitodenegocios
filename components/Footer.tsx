import Link from 'next/link'
import type { SiteData } from '@/types'

export default function Footer({ data }: { data: SiteData; locale?: string }) {
  const phoneHref = `tel:${data.phone.replace(/\D/g, '')}`

  return (
    <footer className="bg-navy-dark text-white pt-12 pb-6">
      <div className="container-fw">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          <div>
            <h3 className="font-serif text-gold-light text-xl font-bold mb-3">{data.name}</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              Direito de Negócios e Empresarial. Estratégia, tática e leitura de jogo para fazer negócios com mais eficiência e menos risco.
            </p>
            <a
              href="https://sceb.com.br"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs border border-white/20 rounded-full px-3 py-1 hover:border-gold-light hover:text-gold-light transition-colors uppercase"
            >
              SCEB — Escritório
            </a>
          </div>

          <div>
            <h4 className="font-serif text-gold-light font-bold mb-3">Áreas de atuação</h4>
            <ul className="space-y-1.5">
              {data.practiceAreas.slice(0, 5).map((a) => (
                <li key={a._id}>
                  <Link href={`/areas-de-atuacao/${a.slug}`} className="text-slate-400 text-sm hover:text-gold-light transition-colors">
                    {a.title}
                  </Link>
                </li>
              ))}
              <li><Link href="/areas-de-atuacao" className="text-gold-light text-sm hover:underline">Ver todas →</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-gold-light font-bold mb-3">Navegação</h4>
            <ul className="space-y-1.5">
              <li><Link href="/sobre" className="text-slate-400 text-sm hover:text-gold-light transition-colors">Sobre</Link></li>
              <li><Link href="/cursos" className="text-slate-400 text-sm hover:text-gold-light transition-colors">Cursos</Link></li>
              <li><Link href="/blog" className="text-slate-400 text-sm hover:text-gold-light transition-colors">Blog</Link></li>
              <li><Link href="/contato" className="text-slate-400 text-sm hover:text-gold-light transition-colors">Contato</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-gold-light font-bold mb-3">Contato</h4>
            <ul className="space-y-1.5 text-sm">
              <li><a href={phoneHref} className="text-slate-400 hover:text-gold-light transition-colors">{data.phone}</a></li>
              <li><a href={`mailto:${data.email}`} className="text-slate-400 hover:text-gold-light transition-colors">{data.email}</a></li>
              <li className="text-slate-400">{data.address}</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6">
          <p className="text-slate-500 text-xs leading-relaxed">{data.footer.disclaimer}</p>
        </div>
      </div>
    </footer>
  )
}
