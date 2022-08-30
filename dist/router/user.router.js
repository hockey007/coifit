"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const mail_rules_1 = require("../rules/mail.rules");
const message_rules_1 = require("../rules/message.rules");
const order_rules_1 = require("../rules/order.rules");
const person_rules_1 = require("../rules/person.rules");
const user_rules_1 = require("../rules/user.rules");
const mail_service_1 = require("../services/mail.service");
const message_service_1 = require("../services/message.service");
const order_service_1 = require("../services/order.service");
const person_service_1 = require("../services/person.service");
const user_service_1 = require("../services/user.service");
exports.userRouter = (0, express_1.Router)();
const userService = new user_service_1.UserService();
const personService = new person_service_1.PersonService();
const orderService = new order_service_1.OrderService();
const mailService = new mail_service_1.MailService();
const messageService = new message_service_1.MessageService();
// User
exports.userRouter.post('/auth', user_rules_1.userRules['forAuthentication'], (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty())
        return res.status(422).json(errors.array());
    const item = userService.auth(req.user);
    return item === null || item === void 0 ? void 0 : item.then((u) => res.json(u));
});
exports.userRouter.post('/verify', user_rules_1.userRules['forVerification'], (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty())
        return res.status(422).json(errors.array());
    const item = userService.verify(req.user);
    return item === null || item === void 0 ? void 0 : item.then((u) => {
        res.json(u);
    });
});
// People
exports.userRouter.post('/people/add', person_rules_1.personRules['addPerson'], (req, res) => {
    // TODO: User Authentication - Verify Token
    // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/46861
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty())
        return res.status(422).json(errors.array());
    const person = personService.add(req.person);
    return person === null || person === void 0 ? void 0 : person.then((person) => {
        res.json(person);
    });
});
exports.userRouter.get("/people/read", person_rules_1.personRules["readPerson"], (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty())
        return res.status(422).json(errors.array());
    var params = {
        userId: req.query.userId,
        offset: req.query.offset,
        limit: req.query.limit
    };
    const people = personService.read(params);
    people === null || people === void 0 ? void 0 : people.then((_people) => {
        var peopleMap = {};
        _people.forEach(function (person) {
            peopleMap[person.id] = person;
        });
        res.json({ message: "Items retrieved successfully", data: peopleMap });
    });
});
// Orders
exports.userRouter.post('/orders/add', order_rules_1.orderRules['bookSlot'], (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty())
        return res.status(422).json(errors.array());
    const order = orderService.add(req.order);
    return order === null || order === void 0 ? void 0 : order.then((o) => {
        res.json(o);
    });
});
// Mail Test
exports.userRouter.post('/mail/send', mail_rules_1.mailRules['sendMail'], (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty())
        return res.status(422).json(errors.array());
    const mail = mailService.send(req.mail);
    return mail === null || mail === void 0 ? void 0 : mail.then((m) => {
        res.json(m);
    });
});
// Message Test
exports.userRouter.post('/message/send', message_rules_1.messageRules['sendMessage'], (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty())
        return res.status(422).json(errors.array());
    const message = messageService.send(req.message);
    return message === null || message === void 0 ? void 0 : message.then((m) => {
        res.json(m);
    });
});
