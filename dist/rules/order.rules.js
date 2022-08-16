"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRules = void 0;
const uuid_1 = require("uuid");
const user_1 = require("../models/user");
exports.orderRules = {
    bookSlot: [
        (req, res, next) => {
            var userId = req.body.userId;
            var category = req.body.category;
            var services = req.body.services;
            var amount = req.body.amount;
            var discount = req.body.discount;
            var coupon = req.body.coupon;
            var parlor = req.body.parlor;
            var from = req.body.from;
            var till = req.body.till;
            var duration = req.body.duration;
            if (!userId || !category || !services || !amount || !discount || !coupon || !parlor || !from || !till)
                res.status(500).json({ error: true, message: "Invalid Request" });
            user_1.User.findOne({ where: { id: userId } }).then((user) => {
                if (!user) {
                    res.status(500).json({ error: true, message: "Invalid User ID" });
                }
                else {
                    if (category == null || category == '') {
                        res.json({ error: true, message: "Invalid/Empty Category" });
                    }
                    else if (!Object.keys(services).length) {
                        res.json({ error: true, message: "Invalid/Empty Services" });
                    }
                    else if (amount < 0) {
                        res.json({ error: true, message: "Invalid Amount" });
                    }
                    else if (!Object.keys(parlor).length) {
                        res.json({ error: true, message: "Invalid/Empty Parlor" });
                    }
                    else if (from == null || from == '') {
                        res.json({ error: true, message: "Enter a valid start time for the service" });
                    }
                    else if (till == null || till == '') {
                        res.json({ error: true, message: "Enter a valid end time for the service" });
                    }
                    else if (duration <= 0) {
                        res.json({ error: true, message: "Enter a valid duration for the service" });
                    }
                    else {
                        var orderData = {
                            id: (0, uuid_1.v4)(),
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
