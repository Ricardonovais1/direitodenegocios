import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(2).max(100),
  // Opcional: o formulário curto da segunda CTA não pede e-mail.
  email: z.string().email().optional(),
  phone: z.string().min(7).max(25),
  role: z.string().min(1),
  message: z.string().max(2000).optional(),
})

/**
 * Escapa o que o visitante digitou antes de interpolar no HTML do e-mail.
 * Sem isso, um `<a href="https://...">Clique aqui</a>` enviado pelo formulário
 * chegaria como link real na caixa de entrada do escritório.
 */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

const row = (label: string, value: string) =>
  `<tr><td style="padding:8px 0;color:#5b6472;width:140px;vertical-align:top;">${label}</td><td style="padding:8px 0;">${escapeHtml(value)}</td></tr>`

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const data = schema.parse(body)

    const apiKey = process.env.RESEND_API_KEY
    const toEmail = process.env.RESEND_TO_EMAIL
    const fromEmail = process.env.RESEND_FROM_EMAIL ?? 'onboarding@resend.dev'

    if (!apiKey || !toEmail) {
      // Modo demonstração: sem credenciais configuradas.
      return NextResponse.json({ success: true, demo: true })
    }

    const resend = new Resend(apiKey)

    await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      // Sem e-mail informado não há para onde responder — melhor não fingir.
      ...(data.email ? { replyTo: data.email } : {}),
      subject: `Nova solicitação de contato — ${data.role}`,
      html: `
        <h2 style="font-family:Georgia,serif;color:#0f1f33;">Nova solicitação de contato</h2>
        <table style="border-collapse:collapse;width:100%;font-family:Arial,sans-serif;">
          ${row('Nome', data.name)}
          ${data.email ? row('E-mail', data.email) : ''}
          ${row('Telefone', data.phone)}
          ${row('Eu sou', data.role)}
          ${data.message ? row('Mensagem', data.message) : ''}
        </table>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: 'Dados inválidos', issues: err.issues }, { status: 400 })
    }
    console.error('[contact] send error:', err)
    return NextResponse.json({ error: 'Falha ao enviar a mensagem' }, { status: 500 })
  }
}
