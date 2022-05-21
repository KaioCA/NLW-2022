import { MailAdapter } from "../mail-adapter";
import { SendMailData } from "./../mail-adapter";
import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "bd2ead1bf830a1",
    pass: "62342590d93d71",
  },
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailData) {
    transport.sendMail({
      from: "Equipe Feedget <oi@feedget.com>",
      to: "Kaio Caldeira <kaiocaldeirati@gmail.com>",
      subject,
      html: body,
    });
  }
}
