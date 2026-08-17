import Link from 'next/link'
import Header from './Header'
import Footer from './Footer'
import Enter from './motion/Enter'
import { getSiteData } from '@/lib/site-data'

/** Conteúdo da página 404, compartilhado pelo not-found raiz e o do locale. */
export default async function NotFoundContent() {
  const data = await getSiteData()
  const shortcuts = data.practiceAreas.filter((area) => area.slug).slice(0, 6)

  return (
    <>
      <Header name={data.name} tagline={data.tagline} phone={data.phone} />

      <main
        id="main-content"
        className="bg-ink texture-grain relative overflow-hidden py-24 text-white md:py-32"
      >
        <div aria-hidden className="texture-weave-dark absolute inset-0" />
        <div aria-hidden className="aurora -right-24 -top-28 h-[380px] w-[380px] bg-gold/15" />

        <div className="container-fw relative max-w-2xl">
          <Enter variant="fade">
            <p className="tabular-nums text-sm font-semibold tracking-[0.3em] text-gold-ink">404</p>
          </Enter>

          <Enter variant="blur" delay={60}>
            <h1 className="mt-5 font-serif text-[2.4rem] font-bold leading-[1.06] md:text-[3.4rem]">
              Esta página saiu do processo.
            </h1>
          </Enter>

          <Enter delay={130}>
            <p className="mt-5 text-lg text-slate-300">
              O endereço não existe mais ou nunca existiu. Mas o que você procurava provavelmente
              está a um clique daqui.
            </p>
          </Enter>

          <Enter delay={190} className="mt-9 flex flex-wrap gap-4">
            <Link href="/" className="btn-gold">
              Voltar ao início
            </Link>
            <Link href="/contato" className="btn-outline">
              Falar com o Dr. Fausto
            </Link>
          </Enter>

          <Enter delay={250} className="mt-14">
            <p className="mb-4 text-[0.68rem] font-black uppercase tracking-[0.2em] text-gold-light/80">
              Áreas de atuação
            </p>
            <ul className="grid gap-2 sm:grid-cols-2">
              {shortcuts.map((area) => (
                <li key={area._id}>
                  <Link
                    href={`/areas-de-atuacao/${area.slug}`}
                    className="group flex items-center justify-between gap-3 rounded-xl border border-white/10 px-4 py-3 text-sm text-slate-300 transition-all duration-500 ease-silk hover:border-gold/40 hover:bg-white/[0.05] hover:text-white"
                  >
                    {area.title}
                    <span aria-hidden className="arrow-slide text-gold">
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Enter>
        </div>
      </main>

      <Footer data={data} />
    </>
  )
}
