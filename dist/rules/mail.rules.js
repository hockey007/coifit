"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mailRules = void 0;
exports.mailRules = {
    sendMail: [
        (req, res, next) => {
            var from = req.body.from;
            var recipient = req.body.recipient;
            var subject = req.body.subject;
            var hmessage = req.body.hmessage;
            var pmessage = req.body.pmessage;
            var type = req.body.type;
            if (!from || !recipient || !subject || !hmessage || !pmessage || !type)
                res.status(500).json({ error: true, message: "Invalid Request" });
            if (from == null || from == '') {
                res.json({ error: true, message: "Invalid/Empty From Address" });
            }
            else if (recipient == null || recipient == '') {
                res.json({ error: true, message: "Invalid/Empty Recipient" });
            }
            else if (subject == null || subject == '') {
                res.json({ error: true, message: "Subject can't be Empty" });
            }
            else if (hmessage == null || hmessage == '') {
                res.json({ error: true, message: "Message can't be Empty" });
            }
            else if (pmessage == null || pmessage == '') {
                res.json({ error: true, message: "Message can't be Empty" });
            }
            else {
                var mailInfo = {
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
