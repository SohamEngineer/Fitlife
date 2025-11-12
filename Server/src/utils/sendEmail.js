import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASS,
  },
});

export const sendEmail = async (to, subject, text) => {
  await transporter.sendMail({
    from: `"Health & Fitness" <${process.env.SMTP_EMAIL}>`,
    to,
    subject,
    text,
  });
};
