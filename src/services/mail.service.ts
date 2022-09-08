import { Mail } from '../instances/sequelize';
const nodemailer = require('nodemailer');

export class MailService {
    static get mailAttributes() {
        return ['id', 'from', 'recipient', 'subject', 'hmessage', 'pmessage', 'type', 'createdAt', 'updatedAt'];
    }
    private static _mail;
    static get mail() {
        return MailService._mail;
    }

    send({ from: from, recipient: recipient, subject: subject, hmessage: hmessage, pmessage: pmessage, type: type }: any) {
        let transporter = nodemailer.createTransport({
            host: 'smtp.hostinger.com',
            port: 465,
            secure: true,
            auth: {
                user: 'nodemailer@koushikaent.com',
                pass: 'NodeMailer@Coifit1',
            },
            tls: {
                ciphers: 'SSLv3',
                rejectUnauthorized: false,
            },
        });

        return transporter
            .sendMail({
                from: from,
                to: recipient,
                subject: subject,
                text: pmessage,
                html: hmessage,
            })
            .then((mail) => {
                var messageId = mail.messageId.substr(1, 36);
                if (!mail) {
                    return { error: true, message: 'Mail not sent, please try again !' };
                } else {
                    return Mail.create({
                        id: messageId,
                        from: from,
                        recipient: recipient,
                        subject: subject,
                        hmessage: hmessage,
                        pmessage: pmessage,
                        type: type,
                    }).then((m) => this.getMailById(m!.id));
                }
            });
    }

    getMailById(id: string) {
        return Mail.findByPk(id, {
            attributes: MailService.mailAttributes,
        });
    }
}
