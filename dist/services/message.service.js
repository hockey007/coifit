"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageService = void 0;
const message_1 = require("../models/message");
const fast2sms = require('fast-two-sms');
class MessageService {
    static get messageAttributes() {
        return ["id", "recipient", "message", "type", "requestId", "createdAt", "updatedAt"];
    }
    static get message() {
        return MessageService._message;
    }
    send({ id: id, recipient: recipient, message: message, type: type }) {
        return fast2sms.sendMessage({ authorization: process.env.API_KEY, sender_id: "COIFIT", message: message, numbers: [recipient], route: "p", variables: 'Variables used like: "{#AA#}|{#EE#}|{#CC#}" seperated by pipe "|".', variables_values: 'Above variables values like: "Rahul|8888888888|6695" seperated by pipe "|".' }).then(response => {
            if (response.return) {
                return message_1.Message.create({
                    id: id,
                    recipient: recipient,
                    message: message,
                    type: type,
                    requestId: response.request_id
                }).then((m) => this.getMessageById(m.id));
            }
            else {
                return { error: true, message: "Message not sent, please try again !" };
            }
        });
    }
    getMessageById(id) {
        return message_1.Message.findByPk(id, {
            attributes: MessageService.messageAttributes,
        });
    }
}
exports.MessageService = MessageService;
