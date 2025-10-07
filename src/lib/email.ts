import { Resend } from 'resend'

// Types and interfaces
interface EmailTemplate {
  subject: string
  html: string
}

interface EmailConfig {
  from: string
  to: string
  subject: string
  html: string
}

interface EmailTemplateData {
  [key: string]: string | number | boolean
}

interface EmailProvider {
  send(config: EmailConfig): Promise<void>
  getName(): string
}

interface EmailProviderConfig {
  apiKey: string
  from: string
}

// Configuration
const resendApiKey = process.env.RESEND_API_KEY
const brevoApiKey = process.env.BREVO_API_KEY
const emailProvider = process.env.EMAIL_PROVIDER || 'brevo' // Default to Brevo
const from = process.env.EMAIL_FROM || 'Nhung Consultancy <contact@nhungconsultancy.com>'
const isDevelopment = process.env.NODE_ENV === 'development'

// Validate and fix sender email for Brevo
function getValidSenderEmail(originalFrom: string, provider: string): string {
  console.log(`🔧 Converting sender email: "${originalFrom}" for provider: "${provider}"`)

  // Extract optional display name and email address from formats like: "Name <email@domain>"
  const bracketMatch = originalFrom.match(/^\s*(.*?)\s*<\s*(.+?)\s*>\s*$/)
  const displayName = bracketMatch ? (bracketMatch[1] || '').trim() : ''
  const rawEmail = (bracketMatch ? bracketMatch[2] : originalFrom).trim()

  // Only attempt domain fix when Brevo and clearly invalid domains
  const needsDomainFix = rawEmail.includes('localhost') || rawEmail.includes('127.0.0.1') || rawEmail.includes('example.com')
  if (provider === 'brevo' && needsDomainFix) {
    const [localPart] = rawEmail.split('@')
    const fixedEmailOnly = `${localPart}@nhungconsultancy.com`
    const reconstructed = displayName ? `${displayName} <${fixedEmailOnly}>` : fixedEmailOnly
    console.log(`✅ Fixed sender email: "${originalFrom}" → "${reconstructed}"`)
    return reconstructed
  }

  // Preserve original formatting, ensuring closing '>' remains when present
  return bracketMatch ? `${displayName} <${rawEmail}>` : rawEmail
}

// Provider configurations
const emailConfig: EmailProviderConfig = {
  apiKey: emailProvider === 'brevo' ? brevoApiKey || '' : resendApiKey || '',
  from: getValidSenderEmail(from, emailProvider)
}

if (!emailConfig.apiKey && !isDevelopment) {
  console.warn(`${emailProvider.toUpperCase()}_API_KEY is not set. Email sending will fail until configured.`)
}

// HTML Template Functions
function createBaseEmailTemplate(content: string): string {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Nhung Consultancy</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #f9fafb; font-family: Arial, sans-serif;">
      <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 20px;">
        ${content}
        <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
        <p style="color: #6b7280; font-size: 12px; text-align: center; margin: 0;">
          Nhung Consultancy Admin System
        </p>
      </div>
    </body>
    </html>
  `
}

function createPasswordResetTemplate(data: EmailTemplateData): EmailTemplate {
  const resetUrl = data.resetUrl as string
  const userName = data.userName as string || 'User'
  
  const content = `
    <div style="text-align: center; margin-bottom: 30px;">
      <h2 style="color: #2563eb; margin: 0; font-size: 24px;">Password Reset Request</h2>
    </div>
    
    <div style="color: #374151; line-height: 1.6;">
      <p>Hello ${userName},</p>
      <p>You requested a password reset for your Nhung Consultancy admin account.</p>
      
      <div style="text-align: center; margin: 30px 0;">
        <a href="${resetUrl}" 
           style="background-color: #2563eb; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: 500; font-size: 16px;">
          Reset Password
        </a>
      </div>
      
      <div style="background-color: #fef3c7; border: 1px solid #f59e0b; border-radius: 8px; padding: 16px; margin: 20px 0;">
        <p style="margin: 0 0 10px 0; font-weight: 600; color: #92400e;"><strong>Important:</strong></p>
        <ul style="margin: 0; padding-left: 20px; color: #92400e;">
          <li>This link expires in 1 hour</li>
          <li>It can only be used once</li>
          <li>If you didn't request this reset, please ignore this email</li>
        </ul>
      </div>
      
      <p style="color: #6b7280; font-size: 14px;">
        If the button doesn't work, you can copy and paste this link into your browser:<br>
        <a href="${resetUrl}" style="color: #2563eb; word-break: break-all;">${resetUrl}</a>
      </p>
    </div>
  `
  
  return {
    subject: 'Reset your password - Nhung Consultancy',
    html: createBaseEmailTemplate(content)
  }
}

function createWelcomeTemplate(data: EmailTemplateData): EmailTemplate {
  const userName = data.userName as string
  const loginUrl = data.loginUrl as string
  
  const content = `
    <div style="text-align: center; margin-bottom: 30px;">
      <h2 style="color: #2563eb; margin: 0; font-size: 24px;">Welcome to Nhung Consultancy</h2>
    </div>
    
    <div style="color: #374151; line-height: 1.6;">
      <p>Hello ${userName},</p>
      <p>Welcome to the Nhung Consultancy admin system! Your account has been created successfully.</p>
      
      <div style="text-align: center; margin: 30px 0;">
        <a href="${loginUrl}" 
           style="background-color: #10b981; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: 500; font-size: 16px;">
          Access Your Account
        </a>
      </div>
      
      <p>If you have any questions or need assistance, please don't hesitate to contact our support team.</p>
    </div>
  `
  
  return {
    subject: 'Welcome to Nhung Consultancy Admin System',
    html: createBaseEmailTemplate(content)
  }
}

function createNotificationTemplate(data: EmailTemplateData): EmailTemplate {
  const title = data.title as string
  const message = data.message as string
  const actionUrl = data.actionUrl as string
  const actionText = data.actionText as string || 'View Details'
  
  const content = `
    <div style="text-align: center; margin-bottom: 30px;">
      <h2 style="color: #2563eb; margin: 0; font-size: 24px;">${title}</h2>
    </div>
    
    <div style="color: #374151; line-height: 1.6;">
      <p>${message}</p>
      
      ${actionUrl ? `
        <div style="text-align: center; margin: 30px 0;">
          <a href="${actionUrl}" 
             style="background-color: #2563eb; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: 500; font-size: 16px;">
            ${actionText}
          </a>
        </div>
      ` : ''}
    </div>
  `
  
  return {
    subject: title,
    html: createBaseEmailTemplate(content)
  }
}

// Email Provider Implementations
class ResendProvider implements EmailProvider {
  private resend: Resend

  constructor(apiKey: string) {
    this.resend = new Resend(apiKey)
  }

  async send(config: EmailConfig): Promise<void> {
    const result = await this.resend.emails.send({
      from: config.from,
      to: config.to,
      subject: config.subject,
      html: config.html,
    })

    if (result.error) {
      throw new Error(`Resend API Error: ${result.error.message}`)
    }
  }

  getName(): string {
    return 'Resend'
  }
}

class BrevoProvider implements EmailProvider {
  private apiKey: string
  private baseUrl = 'https://api.brevo.com/v3'

  constructor(apiKey: string) {
    this.apiKey = apiKey
  }

  async send(config: EmailConfig): Promise<void> {
    try {
      // Parse sender email and name - handle both formats
      let senderName = 'Nhung Consultancy'
      let senderEmail = config.from
      
      // Try to parse "Name <email>" format
      const senderMatch = config.from.match(/^(.+?)\s*<(.+?)>$/) || config.from.match(/^(.+?)\s*<(.+)$/)
      if (senderMatch && senderMatch.length >= 3) {
        senderName = senderMatch[1]?.trim() || 'Nhung Consultancy'
        senderEmail = senderMatch[2]?.trim() || config.from
      }

      console.log(`🔍 BrevoProvider: Processing sender email: "${senderEmail}"`)

      // Validate sender email for Brevo
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(senderEmail)) {
        throw new Error(`Invalid sender email format: ${senderEmail}. Brevo requires a valid email address.`)
      }

      // Check for localhost/invalid domains
      if (senderEmail.includes('localhost') || senderEmail.includes('127.0.0.1') || senderEmail.includes('example.com')) {
        throw new Error(`Invalid sender domain: ${senderEmail}. Please use a real domain email address for Brevo.`)
      }

      const emailData = {
        sender: {
          name: senderName,
          email: senderEmail
        },
        to: [
          {
            email: config.to
          }
        ],
        subject: config.subject,
        htmlContent: config.html
      }

      const response = await fetch(`${this.baseUrl}/smtp/email`, {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'api-key': this.apiKey,
          'content-type': 'application/json'
        },
        body: JSON.stringify(emailData)
      })

      if (!response.ok) {
        const errorData = await response.text()
        throw new Error(`Brevo API Error (${response.status}): ${errorData}`)
      }

      const result = await response.json()
      console.log('✅ Brevo API Response:', JSON.stringify(result, null, 2))
    } catch (error) {
      console.error('❌ Brevo API Error:', error)
      if (error instanceof Error) {
        throw new Error(`Brevo API Error: ${error.message}`)
      }
      throw new Error('Brevo API Error: Unknown error occurred')
    }
  }

  getName(): string {
    return 'Brevo'
  }
}

// Provider Factory
function createEmailProvider(): EmailProvider {
  if (!emailConfig.apiKey && !isDevelopment) {
    throw new Error(`${emailProvider.toUpperCase()}_API_KEY not configured`)
  }

  switch (emailProvider.toLowerCase()) {
    case 'brevo':
      return new BrevoProvider(emailConfig.apiKey)
    case 'resend':
      return new ResendProvider(emailConfig.apiKey)
    default:
      throw new Error(`Unsupported email provider: ${emailProvider}`)
  }
}

// Generic email sending function
async function sendEmail(config: EmailConfig): Promise<void> {
  // Input validation
  if (!config.to || !config.subject || !config.html) {
    throw new Error('Email configuration is incomplete: to, subject, and html are required')
  }
  
  // Email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(config.to)) {
    throw new Error(`Invalid email address: ${config.to}`)
  }
  
  // Use the corrected email configuration instead of the passed config
  const correctedConfig: EmailConfig = {
    ...config,
    from: emailConfig.from  // Use the processed/fixed email address
  }
  
  const provider = createEmailProvider()
  
  console.log('📧 Email service called with:')
  console.log('  - Provider:', provider.getName())
  console.log('  - To:', correctedConfig.to)
  console.log('  - From:', correctedConfig.from)
  console.log('  - Subject:', correctedConfig.subject)
  console.log('  - API Key exists:', !!emailConfig.apiKey)
  console.log('  - Is Development:', isDevelopment)
  
  // In development, log the email instead of sending it
  if (isDevelopment && !emailConfig.apiKey) {
    console.log('\n📧 EMAIL (Development Mode)')
    console.log('==========================================')
    console.log(`Provider: ${provider.getName()}`)
    console.log(`To: ${correctedConfig.to}`)
    console.log(`From: ${correctedConfig.from}`)
    console.log(`Subject: ${correctedConfig.subject}`)
    console.log('HTML Content: [Email template rendered]')
    console.log('==========================================')
    console.log(`📧 In production, this would be sent via ${provider.getName()} API`)
    console.log(`💡 To test with real emails, set ${emailProvider.toUpperCase()}_API_KEY in your environment\n`)
    return
  }

  // Production mode or when API key is provided
  if (!emailConfig.apiKey) {
    console.error(`❌ ${emailProvider.toUpperCase()}_API_KEY not configured`)
    throw new Error(`${emailProvider.toUpperCase()}_API_KEY not configured`)
  }
  
  console.log(`📤 Attempting to send email via ${provider.getName()}...`)
  
  try {
    await provider.send(correctedConfig)
    console.log(`🎉 Email sent successfully via ${provider.getName()}!`)
    
  } catch (error) {
    console.error(`❌ Error in sendEmail (${provider.getName()}):`, error)
    if (error instanceof Error) {
      throw new Error(`Failed to send email: ${error.message}`)
    }
    throw new Error('Failed to send email: Unknown error occurred')
  }
}

// Specific email functions using the generic system
export async function sendPasswordResetEmail(to: string, resetUrl: string, userName?: string): Promise<void> {
  try {
    const template = createPasswordResetTemplate({
      resetUrl,
      userName: userName || 'User'
    })
    
    await sendEmail({
      from: emailConfig.from,
      to,
      subject: template.subject,
      html: template.html
    })
  } catch (error) {
    console.error('❌ Error in sendPasswordResetEmail:', error)
    throw error
  }
}

export async function sendWelcomeEmail(to: string, userName: string, loginUrl: string): Promise<void> {
  try {
    const template = createWelcomeTemplate({
      userName,
      loginUrl
    })
    
    await sendEmail({
      from: emailConfig.from,
      to,
      subject: template.subject,
      html: template.html
    })
  } catch (error) {
    console.error('❌ Error in sendWelcomeEmail:', error)
    throw error
  }
}

export async function sendNotificationEmail(
  to: string, 
  title: string, 
  message: string, 
  actionUrl?: string, 
  actionText?: string
): Promise<void> {
  try {
    const templateData: EmailTemplateData = {
      title,
      message
    }
    
    if (actionUrl) {
      templateData.actionUrl = actionUrl
    }
    if (actionText) {
      templateData.actionText = actionText
    }
    
    const template = createNotificationTemplate(templateData)
    
    await sendEmail({
      from: emailConfig.from,
      to,
      subject: template.subject,
      html: template.html
    })
  } catch (error) {
    console.error('❌ Error in sendNotificationEmail:', error)
    throw error
  }
}

// Export the generic sendEmail function and types for custom use cases
export { 
  sendEmail, 
  createEmailProvider,
  type EmailConfig, 
  type EmailTemplate, 
  type EmailTemplateData,
  type EmailProvider
}


