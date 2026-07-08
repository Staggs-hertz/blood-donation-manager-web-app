import nodemailer, { Transporter } from "nodemailer";

let transporter: Transporter;

export const getEmailTransport = (): Transporter => {
  if (transporter) return transporter;

  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    tls: {
      rejectUnauthorized: process.env.NODE_ENV === "production",
    },
  });

  // Verify connection in development
  if (process.env.NODE_ENV === "development") {
    transporter.verify((error) => {
      if (error) {
        console.error("Email transporter verification failed:", error);
      } else {
        console.log("✅ Email transporter ready");
      }
    });
  }

  return transporter;
};

export const emailConfig = {
  from: process.env.EMAIL_FROM,
  frontendUrl: process.env.FRONTEND_URL,
};
