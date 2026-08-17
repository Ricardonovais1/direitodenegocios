import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageHero from '@/components/PageHero'
import Reveal from '@/components/motion/Reveal'
import { getSiteData } from '@/lib/site-data'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  await params
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? ''
  return {
    title: 'Privacidade e cookies',
    description:
      'Como os dados enviados neste site são tratados: finalidade, base legal, retenção, cookies e como exercer os seus direitos sob a LGPD.',
    alternates: { canonical: `${siteUrl}/privacidade` },
  }
}

export default async function PrivacidadePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const data = await getSiteData()

  const sections = [
    {
      title: 'Quais dados são coletados',
      body: 'Apenas o que você digita nos formulários de contato deste site: nome, telefone/WhatsApp, e-mail (quando solicitado), o perfil que você seleciona e a mensagem que escreve. Não há cadastro, login nem coleta de dados sensíveis.',
    },
    {
      title: 'Para que os dados são usados',
      body: 'Exclusivamente para responder à sua solicitação e dar seguimento a um eventual atendimento. Os dados não são vendidos, cedidos nem usados para envio de comunicação não solicitada.',
    },
    {
      title: 'Base legal',
      body: 'O tratamento se apoia no seu consentimento ao enviar o formulário e, quando houver contratação, na execução de contrato e no cumprimento de obrigações legais e regulatórias da advocacia (art. 7º, I, V e II da LGPD).',
    },
    {
      title: 'Com quem os dados são compartilhados',
      body: 'Com os provedores necessários para operar o site e entregar as mensagens: a hospedagem (Vercel), o serviço de envio de e-mail (Resend) e as ferramentas de análise e atendimento descritas abaixo. Cada um trata os dados apenas para essa finalidade.',
    },
    {
      title: 'Cookies',
      body: 'Cookies essenciais mantêm o site funcionando e guardam a sua escolha neste aviso. Cookies de análise (Google Analytics) só são ativados se você aceitar — eles ajudam a entender quais conteúdos são úteis, de forma agregada. Você pode recusá-los sem prejuízo de navegação, escolhendo “Somente essenciais”.',
    },
    {
      title: 'Por quanto tempo os dados ficam guardados',
      body: 'Mensagens de contato são mantidas pelo tempo necessário ao atendimento. Havendo relação contratual, os documentos seguem os prazos legais e as normas de guarda aplicáveis à advocacia.',
    },
    {
      title: 'Sigilo profissional',
      body: 'O conteúdo do que você relata é protegido por sigilo profissional, mesmo que a contratação não se concretize.',
    },
    {
      title: 'Seus direitos',
      body: 'Você pode solicitar a confirmação do tratamento, o acesso, a correção, a portabilidade, a anonimização ou a exclusão dos seus dados, bem como revogar o consentimento, a qualquer momento.',
    },
  ]

  return (
    <>
      <Header name={data.name} tagline={data.tagline} phone={data.phone} locale={locale} />

      <main id="main-content">
        <PageHero
          eyebrow="Privacidade"
          title="Como tratamos os seus dados."
          lead="Em resumo: o que você envia aqui serve para responder a você — e nada além disso."
          crumbs={[{ label: 'Início', href: '/' }, { label: 'Privacidade' }]}
          compact
        />

        <section className="bg-offwhite py-16 md:py-20">
          <div className="container-fw max-w-3xl">
            <div className="grid gap-8">
              {sections.map((section, index) => (
                <Reveal
                  key={section.title}
                  variant="up"
                  delay={Math.min(index, 3) * 60}
                  as="article"
                >
                  <h2 className="mb-2 font-serif text-xl font-bold text-navy">{section.title}</h2>
                  <p className="text-[#3c4757]">{section.body}</p>
                </Reveal>
              ))}
            </div>

            <Reveal
              variant="up"
              className="mt-12 rounded-[20px] border border-black/[0.06] bg-white p-7"
            >
              <h2 className="mb-2 font-serif text-xl font-bold text-navy">
                Como exercer os seus direitos
              </h2>
              <p className="mb-5 text-[#3c4757]">
                Escreva para{' '}
                <a
                  href={`mailto:${data.email}`}
                  className="link-underline font-bold text-navy hover:text-gold-ink"
                >
                  {data.email}
                </a>{' '}
                com o pedido. Respondemos em até um dia útil.
              </p>
              <Link href="/contato" className="btn-navy">
                Falar com o Dr. Fausto
              </Link>
            </Reveal>

            <p className="mt-10 text-xs leading-relaxed text-muted">
              Esta página tem caráter informativo e pode ser atualizada. Última revisão feita junto
              com a última publicação do site.
            </p>
          </div>
        </section>
      </main>

      <Footer data={data} locale={locale} />
    </>
  )
}
