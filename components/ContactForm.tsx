'use client'

import { useState, FormEvent } from 'react'

type Status = 'idle' | 'loading' | 'success' | 'error'

const inputClass =
  'w-full px-4 py-3 border border-[#d9d9d9] rounded-xl bg-white text-[#1f2933] focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition'

const labelClass = 'block text-navy font-extrabold text-sm mb-1.5'

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')
    setError('')

    const form = e.currentTarget
    const data = {
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
        body: JSON.stringify(data),
      })

      if (!res.ok) throw new Error((await res.json()).error ?? 'Falha na solicitação')
      setStatus('success')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Algo deu errado. Tente novamente.')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div
        role="status"
        className="rounded-xl bg-green-50 border border-green-200 p-5 text-center text-green-800"
      >
        <p className="font-bold text-lg mb-1">Mensagem recebida!</p>
        <p className="text-sm">Retornaremos em até um dia útil. Se for urgente, ligue para {''}(31) 2515-6500.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="grid gap-3.5">
      <div>
        <label htmlFor="cf-name" className={labelClass}>Nome completo</label>
        <input id="cf-name" name="name" type="text" placeholder="Seu nome" autoComplete="name" required className={inputClass} />
      </div>

      <div>
        <label htmlFor="cf-email" className={labelClass}>E-mail</label>
        <input id="cf-email" name="email" type="email" placeholder="voce@empresa.com.br" autoComplete="email" required className={inputClass} />
      </div>

      <div>
        <label htmlFor="cf-phone" className={labelClass}>Telefone / WhatsApp</label>
        <input id="cf-phone" name="phone" type="tel" placeholder="(31) 99999-9999" autoComplete="tel" required className={inputClass} />
      </div>

      <div>
        <label htmlFor="cf-role" className={labelClass}>Eu sou</label>
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
        <label htmlFor="cf-message" className={labelClass}>Mensagem (opcional)</label>
        <textarea
          id="cf-message"
          name="message"
          placeholder="Descreva brevemente a sua situação..."
          rows={3}
          className={`${inputClass} resize-y`}
        />
      </div>

      {status === 'error' && (
        <p role="alert" className="text-red-600 text-sm">{error}</p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full min-h-[48px] rounded-full bg-gold text-gray-900 font-extrabold hover:bg-gold-light transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? 'Enviando…' : 'Enviar solicitação'}
      </button>
    </form>
  )
}
