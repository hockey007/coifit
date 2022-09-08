import { Json } from 'sequelize/types/utils';
import { v4 as uuidv4 } from 'uuid';
import { MailSendModel } from '../models/mailModel';

export const mailRules = {
  sendMail: [
    (req: any, res, next) => {
        var from: string = req.body.from;
        var recipient: string = req.body.recipient;
        var subject: string = req.body.subject;
        var hmessage: string = req.body.hmessage;
        var pmessage: string = req.body.pmessage;
        var type: string = req.body.type;
  
        if(!from || !recipient || !subject || !hmessage || !pmessage || !type)
          res.status(500).json({ error: true, message: "Invalid Request" });
  
        if(from == null || from == '') {
            res.json({ error: true, message: "Invalid/Empty From Address" });
        } else if(recipient == null || recipient == '') {
            res.json({ error: true, message: "Invalid/Empty Recipient" });
        } else if(subject == null || subject == '') {
            res.json({ error: true, message: "Subject can't be Empty" });
        } else if(hmessage == null || hmessage == '') {
            res.json({ error: true, message: "Message can't be Empty" });
        } else if(pmessage == null || pmessage == '') {
            res.json({ error: true, message: "Message can't be Empty" });
        } else {
            var mailInfo: MailSendModel = {
                from: from,
                recipient: recipient,
                subject: subject,
                hmessage: hmessage,
                pmessage: pmessage,
                type: type
            };
            req.mail = mailInfo;
            next();
        }
    },
  ],
};