import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export async function sendVerificationEmail(email: string, token: string) {
  const verificationUrl = `${process.env.NEXTAUTH_URL}/auth/verify?token=${token}`

  const mailOptions = {
    from: process.env.SMTP_FROM || 'noreply@discoverchina.com',
    to: email,
    subject: 'Verify your email - Discover China',
    html: `
      <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
        <div style="background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); padding: 20px; text-align: center;">
          <h1 style="color: white; margin: 0;">🇨🇳 Discover China</h1>
        </div>
        
        <div style="padding: 30px; background: white;">
          <h2 style="color: #333; margin-bottom: 20px;">Welcome to Discover China!</h2>
          
          <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
            Thank you for joining our community of China travel enthusiasts. 
            To complete your registration, please verify your email address by clicking the button below.
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${verificationUrl}" 
               style="background: #dc2626; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold;">
              Verify Email Address
            </a>
          </div>
          
          <p style="color: #666; font-size: 14px; margin-top: 20px;">
            If you didn't create an account with us, please ignore this email.
          </p>
          
          <p style="color: #666; font-size: 14px;">
            If the button doesn't work, copy and paste this link into your browser:<br>
            <a href="${verificationUrl}" style="color: #dc2626;">${verificationUrl}</a>
          </p>
        </div>
        
        <div style="background: #f8f9fa; padding: 20px; text-align: center; color: #666; font-size: 12px;">
          © 2024 Discover China. All rights reserved.
        </div>
      </div>
    `,
  }

  return transporter.sendMail(mailOptions)
}

export async function sendPasswordResetEmail(email: string, token: string) {
  const resetUrl = `${process.env.NEXTAUTH_URL}/auth/reset-password?token=${token}`

  const mailOptions = {
    from: process.env.SMTP_FROM || 'noreply@discoverchina.com',
    to: email,
    subject: 'Reset your password - Discover China',
    html: `
      <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
        <div style="background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); padding: 20px; text-align: center;">
          <h1 style="color: white; margin: 0;">🇨🇳 Discover China</h1>
        </div>
        
        <div style="padding: 30px; background: white;">
          <h2 style="color: #333; margin-bottom: 20px;">Password Reset Request</h2>
          
          <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
            We received a request to reset your password. Click the button below to create a new password.
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}" 
               style="background: #dc2626; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold;">
              Reset Password
            </a>
          </div>
          
          <p style="color: #666; font-size: 14px; margin-top: 20px;">
            This link will expire in 1 hour. If you didn't request a password reset, please ignore this email.
          </p>
          
          <p style="color: #666; font-size: 14px;">
            If the button doesn't work, copy and paste this link into your browser:<br>
            <a href="${resetUrl}" style="color: #dc2626;">${resetUrl}</a>
          </p>
        </div>
        
        <div style="background: #f8f9fa; padding: 20px; text-align: center; color: #666; font-size: 12px;">
          © 2024 Discover China. All rights reserved.
        </div>
      </div>
    `,
  }

  return transporter.sendMail(mailOptions)
}