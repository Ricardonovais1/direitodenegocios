'use client'

import { useEffect, useRef, useState, type FormEvent } from 'react'

type Status = 'idle' | 'loading' | 'success' | 'error'

// O foco usa outline navy (16,6:1) em vez do anel dourado (2,35:1), e a borda
// não é apagada no foco — o campo focado precisa ficar MAIS delimitado.
const inputClass =
  'w-full rounded-xl border border-black/[0.12] bg-white px-4 py-3 text-[#1f2933] transition duration-300 placeholder:text-[#5b6472] hover:border-gold/50 focus:border-navy focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-navy'

const labelClass = 'mb-1.5 block text-sm font-extrabold text-navy'

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')
  const successRef = useRef<HTMLDivElement>(null)

  // O formulário é desmontado no sucesso; sem isso o foco cairia no <body>
  // e o usuário de teclado voltaria ao topo da página.
  useEffect(() => {
    if (status === 'success') successRef.current?.focus()
  }, [status])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('loading')
    setError('')

    const form = event.currentTarget
    const payload = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      phone: (form.elements.namedItem('phone') as HTMLInputElement).value,
      role: (form.elements.namedItem('role') as HTMLSelectElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        // A resposta de erro pode não ser JSON (502, página de erro do proxy).
        const payload = await res.json().catch(() => ({}))
        throw new Error(payload.error ?? 'Falha na solicitação')
      }
      setStatus('success')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Algo deu errado. Tente novamente.')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className="animate-fade-up rounded-2xl border border-gold/30 bg-gold/[0.07] p-7 text-center outline-none"
      >
        <span
          aria-hidden
          className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-gold/20 text-2xl text-gold-ink"
        >
          ✓
        </span>
        <p className="mb-1 font-serif text-xl font-bold text-navy">Mensagem recebida!</p>
        <p className="text-sm text-muted">
          Retornaremos em até um dia útil. Se for urgente, chame no{' '}
          <a
            href="https://wa.me/5531984284815"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-gold-ink underline underline-offset-2"
          >
            WhatsApp
          </a>
          .
        </p>
      </div>
    )
  }

  return (
    // Sem `noValidate`: a validação nativa aponta e foca o campo errado — a
    // API só devolve um "Dados inválidos" genérico.
    <form onSubmit={handleSubmit} className="grid gap-3.5">
      <div>
        <label htmlFor="cf-name" className={labelClass}>
          Nome completo
        </label>
        <input
          id="cf-name"
          name="name"
          type="text"
          placeholder="Seu nome"
          autoComplete="name"
          required
          className={inputClass}
        />
      </div>

      <div className="grid gap-3.5 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-email" className={labelClass}>
            E-mail
          </label>
          <input
            id="cf-email"
            name="email"
            type="email"
            placeholder="voce@empresa.com.br"
            autoComplete="email"
            required
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="cf-phone" className={labelClass}>
            Telefone / WhatsApp
          </label>
          <input
            id="cf-phone"
            name="phone"
            type="tel"
            placeholder="(31) 99999-9999"
            autoComplete="tel"
            required
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="cf-role" className={labelClass}>
          Eu sou
        </label>
        <select id="cf-role" name="role" required className={inputClass}>
          <option value="">Selecione uma opção</option>
          <option value="Empresário">Empresário</option>
          <option value="RH">Profissional de RH</option>
          <option value="Jurídico">Departamento jurídico</option>
          <option value="Startup">Startup / fundador</option>
          <option value="Outro">Outro</option>
        </select>
      </div>

      <div>
        <label htmlFor="cf-message" className={labelClass}>
          Mensagem <span className="font-normal text-muted">(opcional)</span>
        </label>
        <textarea
          id="cf-message"
          name="message"
          placeholder="Descreva brevemente a sua situação..."
          rows={3}
          className={`${inputClass} resize-y`}
        />
      </div>

      {status === 'error' && (
        <p role="alert" className="text-sm text-red-600">
          {error}
        </p>
      )}

      {/* `aria-disabled` em vez de `disabled` para o botão não perder o foco
          durante o envio. */}
      <button
        type="submit"
        aria-disabled={status === 'loading'}
        aria-busy={status === 'loading'}
        onClick={(event) => {
          if (status === 'loading') event.preventDefault()
        }}
        className="btn-navy w-full aria-disabled:cursor-not-allowed aria-disabled:opacity-60"
      >
        {status === 'loading' ? 'Enviando…' : 'Enviar solicitação'}
      </button>

      <p className="text-center text-[0.72rem] leading-relaxed text-muted">
        Seus dados são usados apenas para responder a esta solicitação.
      </p>
    </form>
  )
}
