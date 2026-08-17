import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import Accordion from './motion/Accordion'
import Reveal from './motion/Reveal'
import type { FAQ as FAQItem } from '@/types'

export default async function FAQ({ faqs }: { faqs: FAQItem[] }) {
  const t = await getTranslations('faq')

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  }

  return (
    <section id="faq" className="relative bg-white py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container-fw grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal variant="up">
            <p className="eyebrow mb-4">{t('eyebrow')}</p>
          </Reveal>
          <Reveal variant="up" delay={80}>
            <h2 className="mb-4 font-serif text-[2rem] font-bold leading-[1.06] text-navy md:text-[2.75rem]">
              {t('heading')}
            </h2>
          </Reveal>
          <Reveal variant="up" delay={150}>
            <p className="mb-8 text-lg text-muted">{t('subheading')}</p>
          </Reveal>
          <Reveal variant="up" delay={220}>
            <Link href="/contato" className="link-underline text-sm font-bold text-navy hover:text-gold-ink">
              Sua dúvida não está aqui? Fale comigo
              <span aria-hidden className="arrow-slide">
                →
              </span>
            </Link>
          </Reveal>
        </div>

        <Reveal variant="up" delay={120}>
          <Accordion items={faqs.map((faq) => ({ id: faq._id, question: faq.question, answer: faq.answer }))} />
        </Reveal>
      </div>
    </section>
  )
}
