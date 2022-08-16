import { Json } from 'sequelize/types/utils';
import { v4 as uuidv4 } from 'uuid';
import { ItemAddModel, ItemReadModel} from "../models/item";
import { OrderAddModel } from '../models/orders';
import { User } from '../models/user';

export const orderRules = {
  bookSlot: [
    (req: any, res, next) => {
        var userId: string = req.body.userId;
        var category: string = req.body.category;
        var services: Json = req.body.services;
        var amount: number = req.body.amount;
        var discount: number = req.body.discount;
        var coupon: string = req.body.coupon;
        var parlor: Json = req.body.parlor;
        var from: string = req.body.from;
        var till: string = req.body.till;
        var duration: number = req.body.duration;
  
        if(!userId || !category || !services || !amount || !discount || !coupon || !parlor || !from || !till)
          res.status(500).json({ error: true, message: "Invalid Request" });
  
        User.findOne({ where: { id: userId } }).then((user) => {
          if (!user) {
              res.status(500).json({ error: true, message: "Invalid User ID" });
          } else {
              if(category == null || category == '') {
                  res.json({ error: true, message: "Invalid/Empty Category" });
              } else if(!Object.keys(services).length) {
                  res.json({ error: true, message: "Invalid/Empty Services" });
              } else if(amount < 0) {
                  res.json({ error: true, message: "Invalid Amount" });
              } else if(!Object.keys(parlor).length) {
                  res.json({ error: true, message: "Invalid/Empty Parlor" });
              } else if(from == null || from == '') {
                  res.json({ error: true, message: "Enter a valid start time for the service" });
              } else if(till == null || till == '') {
                  res.json({ error: true, message: "Enter a valid end time for the service" });
              } else if(duration <= 0) {
                  res.json({ error: true, message: "Enter a valid duration for the service" });
              } else {
                  var orderData: OrderAddModel = {
                    id: uuidv4(),
                    userId: userId,
                    category: category,
                    services: services,
                    amount: amount,
                    discount: discount,
                    coupon: coupon,
                    parlor: parlor,
                    from: from,
                    till: till,
                    duration: duration,
                    status: 'booked'
                  };
                  req.order = orderData;
                  next();
              }
          }
      });
    },
  ],
};