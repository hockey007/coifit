"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.itemRouter = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const item_service_1 = require("../services/item.service");
const item_rules_1 = require("../rules/item.rules");
exports.itemRouter = (0, express_1.Router)();
const itemService = new item_service_1.ItemService();
exports.itemRouter.post("/add", item_rules_1.itemRules["addItem"], (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty())
        return res.status(422).json(errors.array());
    const item = itemService.add(req.item);
    return item === null || item === void 0 ? void 0 : item.then((u) => res.json(u));
});
exports.itemRouter.get("/read", item_rules_1.itemRules["readItem"], (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty())
        return res.status(422).json(errors.array());
    var params = {
        parlorId: req.query.parlorId,
        offset: req.params.offset,
        limit: req.params.limit
    };
    const items = itemService.read(params);
    items === null || items === void 0 ? void 0 : items.then((_items) => {
        var itemMap = {};
        _items.forEach(function (item) {
            itemMap[item.id] = item;
        });
        res.json({ message: "Items retrieved successfully", data: itemMap });
    });
});
