import { getTranslations } from 'next-intl/server'
import type { FAQ as FAQItem } from '@/types'

export default async function FAQ({ faqs }: { faqs: FAQItem[] }) {
  const t = await getTranslations('faq')

  return (
    <section id="faq" className="py-20">
      <div className="container-fw">
        <div className="max-w-2xl mb-10">
          <p className="text-gold uppercase tracking-widest text-xs font-black mb-3">{t('eyebrow')}</p>
          <h2 className="font-serif text-navy text-4xl md:text-5xl font-bold leading-tight mb-4">{t('heading')}</h2>
          <p className="text-muted text-lg">{t('subheading')}</p>
        </div>

        <div className="grid gap-3 max-w-3xl">
          {faqs.map((faq) => (
            <details
              key={faq._id}
              className="group bg-white rounded-2xl px-6 py-5 border border-[#ececec] open:shadow-card"
            >
              <summary className="cursor-pointer text-navy font-black list-none flex justify-between items-center gap-4">
                {faq.question}
                <span className="shrink-0 text-gold text-xl leading-none group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="text-muted mt-4">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
