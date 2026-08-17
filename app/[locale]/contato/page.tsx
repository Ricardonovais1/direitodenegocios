import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageHero from '@/components/PageHero'
import ContactForm from '@/components/ContactForm'
import Reveal from '@/components/motion/Reveal'
import BackToTop from '@/components/motion/BackToTop'
import { getSiteData } from '@/lib/site-data'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  await params
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? ''
  return {
    // O sufixo "| Fausto Sette Câmara" vem do template em [locale]/layout.tsx.
    title: 'Contato',
    description:
      'Fale com o Dr. Fausto Sette Câmara. Agende uma consulta sobre Direito de Negócios. Belo Horizonte/MG, atuação nacional.',
    alternates: { canonical: `${siteUrl}/contato` },
  }
}

export default async function ContatoPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const data = await getSiteData()
  const phoneHref = `tel:${data.phone.replace(/\D/g, '')}`

  const channels = [
    {
      label: 'WhatsApp',
      value: 'Resposta mais rápida',
      href: 'https://wa.me/5531984284815',
      external: true,
    },
    { label: 'Telefone', value: data.phone, href: phoneHref },
    { label: 'E-mail', value: data.email, href: `mailto:${data.email}` },
  ]

  const details = [
    { label: 'Endereço', value: data.address },
    { label: 'Atuação', value: 'Nacional (a partir de Belo Horizonte/MG)' },
    { label: 'Atendimento', value: data.officeHours.join(' · ') },
    {
      label: 'LinkedIn',
      value: 'fausto-sette-camara',
      href: 'https://www.linkedin.com/in/fausto-sette-camara-932b3535',
    },
    { label: 'Escritório', value: 'sceb.com.br', href: 'https://sceb.com.br' },
  ]

  return (
    <>
      <Header name={data.name} tagline={data.tagline} phone={data.phone} locale={locale} />

      <main id="main-content">
        <PageHero
          eyebrow="Contato"
          title="Vamos conversar."
          lead="Conte o seu cenário. Eu respondo com o caminho mais eficiente e de menor risco."
          crumbs={[{ label: 'Início', href: '/' }, { label: 'Contato' }]}
          compact
        >
          <div className="grid gap-3 sm:grid-cols-3">
            {channels.map((channel) => (
              <a
                key={channel.label}
                href={channel.href}
                {...(channel.external
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
                className="group rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 transition-all duration-600 ease-silk hover:-translate-y-1 hover:border-gold/50 hover:bg-white/[0.08]"
              >
                <p className="mb-1 text-[0.65rem] font-black uppercase tracking-[0.2em] text-gold-ink">
                  {channel.label}
                </p>
                <p className="flex items-center gap-2 text-sm text-white">
                  {channel.value}
                  <span aria-hidden className="arrow-slide text-gold-light">
                    →
                  </span>
                </p>
              </a>
            ))}
          </div>
        </PageHero>

        <section className="bg-parchment texture-grain texture-grain-light relative py-16 md:py-20">
          <div className="container-fw relative grid items-start gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <Reveal
              variant="up"
              className="rounded-[20px] border border-black/[0.06] bg-white p-7 shadow-card"
            >
              <h2 className="mb-6 font-serif text-xl font-bold text-navy">Informações</h2>
              <ul className="space-y-5">
                {details.map((item) => (
                  <li key={item.label}>
                    <p className="mb-1 text-[0.65rem] font-black uppercase tracking-[0.18em] text-gold-ink">
                      {item.label}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-underline break-all text-sm text-navy transition-colors duration-300 hover:text-gold-ink"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-sm text-muted">{item.value}</p>
                    )}
                  </li>
                ))}
              </ul>

              <p className="mt-8 border-t border-black/[0.06] pt-5 text-xs leading-relaxed text-muted">
                O primeiro contato é sem compromisso e protegido por sigilo profissional.
              </p>
            </Reveal>

            <Reveal
              variant="up"
              delay={120}
              className="relative overflow-hidden rounded-[20px] bg-white p-7 shadow-heavy md:p-9"
            >
              <span
                aria-hidden
                className="absolute inset-x-9 top-0 h-[3px] rounded-b-full bg-gradient-to-r from-gold-light via-gold to-transparent"
              />
              <h2 className="mb-1 font-serif text-2xl font-bold text-navy">Enviar mensagem</h2>
              <p className="mb-6 text-sm text-muted">
                Preencha e retornaremos em até um dia útil.
              </p>
              <ContactForm />
            </Reveal>
          </div>
        </section>
      </main>

      <BackToTop />
      <Footer data={data} locale={locale} />
    </>
  )
}
