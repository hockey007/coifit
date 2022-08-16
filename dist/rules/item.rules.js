"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.itemRules = void 0;
const uuid_1 = require("uuid");
exports.itemRules = {
    addItem: [
        (req, res, next) => {
            var parlorId = req.body.parlorId;
            var name = req.body.name;
            var description = req.body.description;
            var category = req.body.category;
            var eta = req.body.eta;
            var price = req.body.price;
            if (!name || !parlorId || !category || !eta || !price)
                res.status(500).json({ error: true, message: "Invalid Request" });
            if (name.length == 0) {
                res.json({ error: true, message: "Name can't be empty" });
            }
            else if (description.length == 0) {
                res.json({ error: true, message: "Description can't be empty" });
            }
            else if (category.length == 0) {
                res.json({ error: true, message: "Category can't be empty" });
            }
            else if (eta <= 0) {
                res.json({ error: true, message: "Enter a valid time taken by the service" });
            }
            else if (price <= 0) {
                res.json({ error: true, message: "Enter a valid price for the service" });
            }
            else {
                var itemData = {
                    id: (0, uuid_1.v4)(),
                    parlorId: parlorId,
                    name: name,
                    description: description,
                    category: category,
                    eta: eta,
                    price: price,
                    status: "active"
                };
                req.item = itemData;
                next();
            }
        },
    ],
    readItem: [
        (req, res, next) => {
            var parlorId = req.query.parlorId;
            if (!parlorId)
                res.status(500).json({ error: true, message: "Invalid Request" });
            next();
        },
    ],
};
