import { MessageSendModel } from '../models/message';
import { v4 as uuidv4 } from 'uuid';

export const messageRules = {
  sendMessage: [
    (req: any, res, next) => {
        var recipient: string = req.body.recipient;
        var message: string = req.body.message;
        var type: string = req.body.type;
  
        if(!recipient || !message || !type)
          res.status(500).json({ error: true, message: "Invalid Request" });
  
        if(recipient == null || recipient == '') {
            res.json({ error: true, message: "Invalid/Empty Recipient" });
        } else if(message == null || message == '') {
            res.json({ error: true, message: "Message can't be Empty" });
        } else if(type == null || type == '') {
            res.json({ error: true, message: "Invalid/Empty Message Type" });
        } else {
            var messageInfo: MessageSendModel = {
                id: uuidv4(),
                recipient: recipient,
                message: message,
                type: type
            };
            req.message = messageInfo;
            next();
        }
    },
  ],
};