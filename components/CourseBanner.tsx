import Link from 'next/link'
import type { Course } from '@/types'

export default function CourseBanner({ course }: { course: Course }) {
  if (!course) return null

  return (
    <section className="py-20 bg-navy relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(201,164,92,0.22),transparent_50%)]" />
      <div className="container-fw relative">
        <div className="max-w-3xl">
          <p className="text-gold uppercase tracking-widest text-xs font-black mb-3">
            {course.eyebrow ?? 'Curso'}
          </p>
          <h2 className="font-serif text-white text-3xl md:text-5xl font-bold leading-tight mb-4">
            Sua empresa de TI está aplicando a CCT Sindpd-SP/SeproSP corretamente?
          </h2>
          <p className="text-slate-300 text-lg mb-8">
            Quase 100 mil empregados, mais de 10 mil empresas — e uma convenção coletiva de observância obrigatória que a maioria dos RHs e jurídicos aplica sem conhecer a fundo. Aprenda a aplicar a CCT cláusula por cláusula e reduza o risco de ações coletivas sindicais.
          </p>
          <Link
            href={`/cursos/${course.slug}`}
            className="inline-flex items-center justify-center min-h-[48px] px-8 rounded-full bg-gold text-gray-900 font-extrabold hover:bg-gold-light transition-colors"
          >
            Conhecer o curso CCT Sindpd-SP / SeproSP
          </Link>
        </div>
      </div>
    </section>
  )
}
