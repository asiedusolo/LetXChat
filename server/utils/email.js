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
    const verificationUrl = `${process.env.REACT_APP_API_BASE_URL}/verify-email?token=${verificationToken}`

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Verify Your Email for LetXChat',
        html: `
      <h2>Welcome to LetXChat!</h2>
      <p>Please verify your email address to complete your registration:</p>
      <a href="${verificationUrl}">Verify Email</a>
      <p>This link will expire in 24 hours.</p>
    `
    };

    try {
        await transporter.sendMail(mailOptions)
        return true
    } catch (error) {
        console.error('Error sending verification email: ', error)
        return false
    }
}


const sendInvitationEmail = async (email, inviterName, invitationToken) => {
    const signupUrl = `${process.env.REACT_APP_API_BASE_URL}/register?invite=${invitationToken}`

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