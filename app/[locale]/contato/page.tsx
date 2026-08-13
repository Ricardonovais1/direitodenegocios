import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ContactForm from '@/components/ContactForm'
import { getSiteData } from '@/lib/site-data'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  await params
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? ''
  return {
    title: 'Contato — Fausto Sette Câmara',
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

  return (
    <>
      <Header name={data.name} tagline={data.tagline} phone={data.phone} locale={locale} />
      <main id="main-content" className="py-20">
        <div className="container-fw">
          <div className="max-w-2xl mb-12">
            <p className="text-gold uppercase tracking-widest text-xs font-black mb-3">Contato</p>
            <h1 className="font-serif text-navy text-4xl md:text-5xl font-bold leading-tight mb-4">Vamos conversar.</h1>
            <p className="text-muted text-lg">Conte o seu cenário. Eu respondo com o caminho mais eficiente e de menor risco.</p>
          </div>

          <div className="grid md:grid-cols-[0.85fr_1.15fr] gap-10 items-start">
            {/* Info */}
            <div className="bg-white rounded-[18px] p-7 border border-[#ececec] shadow-card">
              <h2 className="font-serif text-navy text-xl font-bold mb-5">Informações</h2>
              <ul className="space-y-4 text-sm">
                <li>
                  <p className="text-gold font-bold uppercase tracking-wider text-xs mb-1">Endereço</p>
                  <p className="text-muted">{data.address}</p>
                </li>
                <li>
                  <p className="text-gold font-bold uppercase tracking-wider text-xs mb-1">Telefone / WhatsApp</p>
                  <a href={phoneHref} className="text-navy hover:text-gold transition-colors">{data.phone}</a>
                </li>
                <li>
                  <p className="text-gold font-bold uppercase tracking-wider text-xs mb-1">E-mail</p>
                  <a href={`mailto:${data.email}`} className="text-navy hover:text-gold transition-colors break-all">{data.email}</a>
                </li>
                <li>
                  <p className="text-gold font-bold uppercase tracking-wider text-xs mb-1">Atuação</p>
                  <p className="text-muted">Nacional (a partir de Belo Horizonte/MG)</p>
                </li>
                <li>
                  <p className="text-gold font-bold uppercase tracking-wider text-xs mb-1">LinkedIn</p>
                  <a href="https://www.linkedin.com/in/fausto-sette-camara-932b3535" target="_blank" rel="noopener noreferrer" className="text-navy hover:text-gold transition-colors break-all">
                    linkedin.com/in/fausto-sette-camara-932b3535
                  </a>
                </li>
                <li>
                  <p className="text-gold font-bold uppercase tracking-wider text-xs mb-1">Escritório</p>
                  <a href="https://sceb.com.br" target="_blank" rel="noopener noreferrer" className="text-navy hover:text-gold transition-colors">sceb.com.br</a>
                </li>
              </ul>
            </div>

            {/* Form */}
            <div className="bg-white rounded-[18px] p-7 border border-[#ececec] shadow-card">
              <h2 className="font-serif text-navy text-xl font-bold mb-1">Enviar mensagem</h2>
              <p className="text-muted text-sm mb-5">Preencha e retornaremos em até um dia útil.</p>
              <ContactForm />
            </div>
          </div>
        </div>
      </main>
      <Footer data={data} locale={locale} />
    </>
  )
}
