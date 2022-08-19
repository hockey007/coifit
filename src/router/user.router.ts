import { Router } from 'express'
import { validationResult } from 'express-validator'
import { PersonReadModel } from '../models/person'
import { mailRules } from '../rules/mail.rules'
import { orderRules } from '../rules/order.rules'
import { personRules } from '../rules/person.rules'
import { userRules } from '../rules/user.rules'
import { MailService } from '../services/mail.service'
import { OrderService } from '../services/order.service'
import { PersonService } from '../services/person.service'
import { UserService } from '../services/user.service'

export const userRouter = Router()
const userService = new UserService()
const personService = new PersonService()
const orderService = new OrderService()
const mailService = new MailService()


// User
userRouter.post('/auth', userRules['forAuthentication'], (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) return res.status(422).json(errors.array());
    const item = userService.auth(req.user);
    return item?.then((u) => res.json(u));
})

userRouter.post('/verify', userRules['forVerification'], (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) return res.status(422).json(errors.array());
    const item = userService.verify(req.user);
    return item?.then((u) => {
        res.json(u)
    });
})

// People
userRouter.post('/people/add', personRules['addPerson'], (req, res) => {
    // TODO: User Authentication - Verify Token
    // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/46861
    
    const errors = validationResult(req)

    if (!errors.isEmpty()) return res.status(422).json(errors.array());
    const person = personService.add(req.person);
    return person?.then((person) => {
        res.json(person)
    });
})

userRouter.get("/people/read", personRules["readPerson"], (req, res) => {
    const errors = validationResult(req);
  
    if (!errors.isEmpty()) return res.status(422).json(errors.array());
    var params: PersonReadModel = {
        userId: req.query.userId,
        offset: req.query.offset,
        limit: req.query.limit
    };
  
    const people = personService.read(params);
    people?.then((_people) => {
      var peopleMap = {};
  
      _people.forEach(function(person) {
        peopleMap[person.id] = person;
      });
  
      res.json({message: "Items retrieved successfully", data: peopleMap});
    });
});

// Orders
userRouter.post('/orders/add', orderRules['bookSlot'], (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) return res.status(422).json(errors.array());
    const order = orderService.add(req.order);
    return order?.then((o) => {
        res.json(o)
    });
})

// Mail Test
userRouter.post('/mail/send', mailRules['sendMail'], (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) return res.status(422).json(errors.array());
    const mail = mailService.send(req.mail);
    return mail?.then((m) => {
        res.json(m)
    });
})