import { getEmailTransport, emailConfig } from "../config/email";

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

const sendEmail = async (options: EmailOptions): Promise<void> => {
  const transporter = getEmailTransport();

  await transporter.sendMail({
    from: emailConfig.from,
    to: options.to,
    subject: options.subject,
    html: options.html,
    text: options.text,
  });
};

const baseEmailTemplate = (content: string): string => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>BloodLink</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #f5f5f5; }
    .container { max-width: 600px; margin: 40px auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08); }
    .header { background: linear-gradient(135deg, #DC2626, #991B1B); padding: 40px 32px; text-align: center; }
    .header h1 { color: white; font-size: 28px; font-weight: 800; letter-spacing: -0.5px; }
    .header p { color: rgba(255,255,255,0.85); font-size: 14px; margin-top: 6px; }
    .body { padding: 40px 32px; }
    .body h2 { font-size: 22px; color: #111; margin-bottom: 16px; }
    .body p { color: #555; line-height: 1.7; margin-bottom: 16px; }
    .btn { display: inline-block; background: #DC2626; color: white; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 600; font-size: 15px; margin: 8px 0; }
    .code-box { background: #FFF7F7; border: 2px solid #FCA5A5; border-radius: 8px; padding: 20px; text-align: center; margin: 24px 0; }
    .code-box span { font-size: 32px; font-weight: 800; color: #DC2626; letter-spacing: 8px; }
    .footer { background: #f9f9f9; padding: 24px 32px; text-align: center; }
    .footer p { color: #999; font-size: 13px; line-height: 1.6; }
    .warning { background: #FFF9C4; border-left: 4px solid #F59E0B; padding: 12px 16px; border-radius: 4px; margin: 16px 0; font-size: 14px; color: #92400E; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🩸 BloodLink</h1>
      <p>Blood Donation Management System</p>
    </div>
    <div class="body">${content}</div>
    <div class="footer">
      <p>This email was sent by BloodLink. If you didn't request this, please ignore this email.</p>
      <p style="margin-top:8px;">© ${new Date().getFullYear()} BloodLink. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`;

export const emailService = {
  async sendVerificationEmail(
    email: string,
    firstName: string,
    token: string,
  ): Promise<void> {
    const verifyUrl = `${emailConfig.frontendUrl}/verify-email?token=${token}`;

    const html = baseEmailTemplate(`
      <h2>Verify your email address</h2>
      <p>Hello, <strong>${firstName}</strong>!</p>
      <p>Thank you for joining BloodLink. To activate your account and start saving lives, please verify your email address.</p>
      <div style="text-align:center; margin: 32px 0;">
        <a href="${verifyUrl}" class="btn">✅ Verify Email Address</a>
      </div>
      <div class="warning">
        ⏰ This link expires in 24 hours. If you didn't create an account, please ignore this email.
      </div>
      <p>Or copy and paste this link in your browser:</p>
      <p style="word-break:break-all; color: #DC2626; font-size: 13px;">${verifyUrl}</p>
    `);

    await sendEmail({
      to: email,
      subject: "BloodLink – Verify Your Email Address",
      html,
      text: `Hello ${firstName},\n\nVerify your email: ${verifyUrl}\n\nThis link expires in 24 hours.`,
    });
  },

  async sendWelcomeEmail(email: string, firstName: string): Promise<void> {
    const html = baseEmailTemplate(`
      <h2>Welcome to BloodLink, ${firstName}! 🎉</h2>
      <p>Your account has been verified and you're all set to make a difference.</p>
      <p>Every blood donation can save up to 3 lives. Here's what you can do on BloodLink:</p>
      <ul style="color:#555; line-height:2; padding-left:20px;">
        <li>Schedule blood donation appointments</li>
        <li>Track your donation history</li>
        <li>Respond to urgent blood requests</li>
        <li>View your impact dashboard</li>
      </ul>
      <div style="text-align:center; margin: 32px 0;">
        <a href="${emailConfig.frontendUrl}/dashboard" class="btn">🩸 Go to Dashboard</a>
      </div>
    `);

    await sendEmail({
      to: email,
      subject: "Welcome to BloodLink – Your Account is Active!",
      html,
    });
  },

  async sendDonationConfirmation(
    email: string,
    firstName: string,
    donationDate: string,
    center: string,
  ): Promise<void> {
    const html = baseEmailTemplate(`
      <h2>Donation Appointment Confirmed</h2>
      <p>Hello, <strong>${firstName}</strong>!</p>
      <p>Your blood donation appointment has been confirmed. Here are the details:</p>
      <div class="code-box" style="text-align:left; padding: 20px;">
        <p><strong>📅 Date:</strong> ${donationDate}</p>
        <p style="margin-top:8px;"><strong>🏥 Center:</strong> ${center}</p>
      </div>
      <p>Please remember to:</p>
      <ul style="color:#555; line-height:2; padding-left:20px;">
        <li>Drink plenty of water before donating</li>
        <li>Eat a healthy meal before your appointment</li>
        <li>Get a good night's sleep</li>
        <li>Bring a valid ID</li>
      </ul>
      <p>Thank you for saving lives! ❤️</p>
    `);

    await sendEmail({
      to: email,
      subject: "BloodLink – Donation Appointment Confirmed",
      html,
    });
  },

  async sendBloodRequestNotification(
    email: string,
    firstName: string,
    bloodType: string,
    urgency: string,
  ): Promise<void> {
    const html = baseEmailTemplate(`
      <h2>🚨 Urgent Blood Request</h2>
      <p>Hello, <strong>${firstName}</strong>!</p>
      <p>A ${urgency.toLowerCase()} blood request has been made for <strong>${bloodType}</strong> blood type.</p>
      <p>As a matching donor, you could save a life today. Please log in to BloodLink to view the details and respond.</p>
      <div style="text-align:center; margin: 32px 0;">
        <a href="${emailConfig.frontendUrl}/blood-requests" class="btn">View Blood Request</a>
      </div>
    `);

    await sendEmail({
      to: email,
      subject: `BloodLink – ${urgency} Blood Request for ${bloodType}`,
      html,
    });
  },
};
