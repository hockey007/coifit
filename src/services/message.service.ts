import * as Bluebird from "Bluebird";
import { QueryTypes } from "sequelize/types";
import { Message, MessageSendModel, MessageViewModel } from "../models/message";
const fast2sms = require('fast-two-sms')

export class MessageService {
  static get messageAttributes() {
    return ["id", "recipient", "message", "type", "requestId", "createdAt", "updatedAt"];
  }

  private static _message;
  static get message() {
    return MessageService._message;
  }

  send({ id: id, recipient: recipient, message: message, type: type }: MessageSendModel) {
    return fast2sms.sendMessage({authorization: process.env.API_KEY, sender_id: "COIFIT", message: message, numbers: [recipient], route: "p", variables: 'Variables used like: "{#AA#}|{#EE#}|{#CC#}" seperated by pipe "|".', variables_values: 'Above variables values like: "Rahul|8888888888|6695" seperated by pipe "|".'}).then(response=>{
      if(response.return) {
        return Message.create({
            id: id,
            recipient: recipient,
            message: message,
            type: type,
            requestId: response.request_id
        }).then((m) => this.getMessageById(m!.id));
      } else {
        return { error: true, message: "Message not sent, please try again !" };
      }
    });
  }

  getMessageById(id: string) {
    return Message.findByPk(id, {
      attributes: MessageService.messageAttributes,
    }) as unknown as Bluebird<MessageViewModel>;
  }
}
