import nodemailer from "nodemailer";

export class MailService {

  static transporter = nodemailer.createTransport({
    host: "smtp.yandex.ru",
    port: 587,
    secure: false,
    auth: {
      user: "toddiwingston@yandex.ru",
      pass: "pivujaacajxpvqkm"
    }
  });

  static async sendActivationMail(to, link) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to: to,
      subject: "Account Activation",
      text: `Please click on the following link to activate your account: ${link}`
    });
  }
}

export const MailApi = new MailService()
