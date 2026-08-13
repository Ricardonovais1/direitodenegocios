import Link from 'next/link'
import type { Course } from '@/types'

export default function CourseCard({ course }: { course: Course }) {
  return (
    <article className="bg-white rounded-[18px] p-8 border border-[#ececec] shadow-card hover:-translate-y-1 hover:shadow-heavy transition-all flex flex-col">
      {course.eyebrow && (
        <p className="text-gold uppercase tracking-widest text-xs font-black mb-3">{course.eyebrow}</p>
      )}
      <h2 className="font-serif text-navy text-2xl font-bold mb-3">{course.title}</h2>
      {course.shortDescription && <p className="text-muted mb-5 flex-1">{course.shortDescription}</p>}
      {course.bonus && (
        <p className="text-sm text-navy font-bold mb-5">🎁 {course.bonus}</p>
      )}
      <Link
        href={`/cursos/${course.slug}`}
        className="inline-flex items-center justify-center min-h-[48px] px-6 rounded-full bg-gold text-gray-900 font-extrabold hover:bg-gold-light transition-colors"
      >
        Quero me inscrever
      </Link>
    </article>
  )
}
