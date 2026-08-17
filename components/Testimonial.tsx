import Reveal from './motion/Reveal'
import TestimonialSlider from './motion/TestimonialSlider'
import type { Testimonial as TestimonialItem } from '@/types'

export default function Testimonial({ testimonials }: { testimonials: TestimonialItem[] }) {
  if (!testimonials?.length) return null

  return (
    <section className="bg-parchment texture-grain texture-grain-light relative py-24">
      <div className="container-fw relative">
        <div className="mb-12 max-w-2xl">
          <Reveal variant="up">
            <p className="eyebrow mb-4">Prova social</p>
          </Reveal>
          <Reveal variant="up" delay={80}>
            <h2 className="font-serif text-[2rem] font-bold leading-[1.06] text-navy md:text-[2.75rem]">
              Quem confia, recomenda.
            </h2>
          </Reveal>
        </div>

        <Reveal variant="up" delay={140}>
          <TestimonialSlider testimonials={testimonials} />
        </Reveal>
      </div>
    </section>
  )
}
