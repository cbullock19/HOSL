import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

interface EmailData {
  to: string
  subject: string
  html: string
}

export async function sendEmail(data: EmailData) {
  try {
    const result = await resend.emails.send({
      from: process.env.FROM_EMAIL || 'noreply@myceliumos.app',
      to: data.to,
      subject: data.subject,
      html: data.html,
    })

    console.log('Email sent successfully:', result)
    return { success: true, messageId: result.data?.id }
  } catch (error) {
    console.error('Failed to send email:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}
