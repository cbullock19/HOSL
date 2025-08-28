import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

interface EmailData {
  to: string
  subject: string
  html: string
}

export async function sendEmail(data: EmailData) {
  try {
    console.log('📧 Attempting to send email to:', data.to)
    console.log('📧 Using Resend API key:', process.env.RESEND_API_KEY ? '✅ Set' : '❌ Missing')
    
    // Use a more standard FROM_EMAIL format that's more likely to work with Resend
    const fromEmail = process.env.FROM_EMAIL || 'onboarding@resend.dev'
    console.log('📧 From email:', fromEmail)
    
    const result = await resend.emails.send({
      from: fromEmail,
      to: data.to,
      subject: data.subject,
      html: data.html,
    })

    console.log('✅ Email sent successfully:', result)
    return { success: true, messageId: result.data?.id }
  } catch (error) {
    console.error('❌ Failed to send email:', error)
    console.error('❌ Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      resendApiKey: process.env.RESEND_API_KEY ? 'Set' : 'Missing',
      fromEmail: process.env.FROM_EMAIL || 'onboarding@resend.dev'
    })
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}
