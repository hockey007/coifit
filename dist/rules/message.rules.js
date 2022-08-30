"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageRules = void 0;
const uuid_1 = require("uuid");
exports.messageRules = {
    sendMessage: [
        (req, res, next) => {
            var recipient = req.body.recipient;
            var message = req.body.message;
            var type = req.body.type;
            if (!recipient || !message || !type)
                res.status(500).json({ error: true, message: "Invalid Request" });
            if (recipient == null || recipient == '') {
                res.json({ error: true, message: "Invalid/Empty Recipient" });
            }
            else if (message == null || message == '') {
                res.json({ error: true, message: "Message can't be Empty" });
            }
            else if (type == null || type == '') {
                res.json({ error: true, message: "Invalid/Empty Message Type" });
            }
            else {
                var messageInfo = {
                    id: (0, uuid_1.v4)(),
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
