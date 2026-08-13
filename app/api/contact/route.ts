import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().min(7).max(25),
  role: z.string().min(1),
  message: z.string().max(2000).optional(),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const data = schema.parse(body)

    const apiKey = process.env.RESEND_API_KEY
    const toEmail = process.env.RESEND_TO_EMAIL
    const fromEmail = process.env.RESEND_FROM_EMAIL ?? 'onboarding@resend.dev'

    if (!apiKey || !toEmail) {
      // Demo mode: no credentials configured
      return NextResponse.json({ success: true, demo: true })
    }

    const resend = new Resend(apiKey)

    await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: data.email,
      subject: `Nova solicitação de contato — ${data.role}`,
      html: `
        <h2 style="font-family:Georgia,serif;color:#0f1f33;">Nova solicitação de contato</h2>
        <table style="border-collapse:collapse;width:100%;font-family:Arial,sans-serif;">
          <tr><td style="padding:8px 0;color:#667085;width:140px;">Nome</td><td style="padding:8px 0;font-weight:bold;">${data.name}</td></tr>
          <tr><td style="padding:8px 0;color:#667085;">E-mail</td><td style="padding:8px 0;">${data.email}</td></tr>
          <tr><td style="padding:8px 0;color:#667085;">Telefone</td><td style="padding:8px 0;">${data.phone}</td></tr>
          <tr><td style="padding:8px 0;color:#667085;">Eu sou</td><td style="padding:8px 0;">${data.role}</td></tr>
          ${data.message ? `<tr><td style="padding:8px 0;color:#667085;vertical-align:top;">Mensagem</td><td style="padding:8px 0;">${data.message}</td></tr>` : ''}
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
