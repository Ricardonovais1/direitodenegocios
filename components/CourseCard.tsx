import Link from 'next/link'
import SpotlightCard from './motion/SpotlightCard'
import type { Course } from '@/types'

export default function CourseCard({ course, delay = 0 }: { course: Course; delay?: number }) {
  return (
    <SpotlightCard delay={delay} className="card-elevated card-topline flex flex-col p-8">
      {course.eyebrow && (
        <p className="mb-3 text-[0.68rem] font-black uppercase tracking-[0.2em] text-gold-ink">
          {course.eyebrow}
        </p>
      )}

      <h2 className="mb-3 font-serif text-2xl font-bold leading-snug text-navy">{course.title}</h2>

      {course.shortDescription && (
        <p className="mb-6 flex-1 text-muted">{course.shortDescription}</p>
      )}

      {course.modules && course.modules.length > 0 && (
        <p className="mb-4 text-sm font-bold text-navy">
          <span className="text-gold-ink">{course.modules.length}</span> módulos · cláusula por cláusula
        </p>
      )}

      {course.bonus && (
        <p className="mb-6 flex items-start gap-2.5 rounded-xl bg-offwhite p-4 text-sm text-navy">
          <span aria-hidden className="text-gold">
            ★
          </span>
          <span>
            <strong className="font-bold">Bônus:</strong> {course.bonus}
          </span>
        </p>
      )}

      <Link href={`/cursos/${course.slug}`} className="btn-gold w-full">
        Conhecer o curso
        <span aria-hidden className="arrow-slide">
          →
        </span>
      </Link>
    </SpotlightCard>
  )
}
