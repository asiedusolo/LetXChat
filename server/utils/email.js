const nodemailer = require('nodemailer')
require('dotenv').config()


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
})


const sendVerificationEmail = async (email, verificationToken) => {
  const verificationUrl = `${process.env.REACT_APP_FRONTEND_BASE_URL}/verify-email?token=${verificationToken}`;

  const mailOptions = {
    from: `LetXChat <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Verify Your Email for LetXChat',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 0.5rem; overflow: hidden;">
        <div style="background-color: #2563eb; padding: 1.5rem; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 1.5rem;">LetXChat Email Verification</h1>
        </div>
        <div style="padding: 1.5rem;">
          <p style="font-size: 1rem; color: #4a5568; margin-bottom: 1.5rem;">
            Thank you for registering with LetXChat! Please verify your email address by clicking the button below:
          </p>
          <div style="text-align: center; margin-bottom: 1.5rem;">
            <a href=${verificationUrl} style="display: inline-block; background-color: #2563eb; color: white; padding: 0.75rem 1.5rem; border-radius: 0.375rem; text-decoration: none; font-weight: 500;">
              Verify Email Address
            </a>
          </div>
          <p style="font-size: 0.875rem; color: #718096; margin-bottom: 0;">
            This link will expire in 24 hours. If you didn't request this, you can safely ignore this email.
          </p>
        </div>
        <div style="background-color: #f7fafc; padding: 1rem; text-align: center; font-size: 0.75rem; color: #718096;">
          © ${new Date().getFullYear()} LetXChat. All rights reserved.
        </div>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Error sending verification email:', error);
    return false;
  }
};


const sendInvitationEmail = async (email, inviterName, invitationToken) => {
    const signupUrl = `${process.env.REACT_APP_FRONTEND_BASE_URL}/register?invite=${invitationToken}`

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: `${inviterName} invited you to chat on LetXChat`,
        html: `
      <h2>You've been invited to LetXChat!</h2>
      <p>${inviterName} has invited you to join a chat on LetXChat.</p>
      <a href=${signupUrl}>Accept Invitation and Sign Up</a>
      <p>This invitation will expire in 7 days.</p>
    `
    }

    try {
        await transporter.sendMail(mailOptions);
        return true;
    } catch (error) {
        console.error('Error sending invitation email:', error);
        return false;
    }
}


module.exports = { sendVerificationEmail, sendInvitationEmail }