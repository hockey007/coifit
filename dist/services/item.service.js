"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemService = void 0;
const item_1 = require("../models/item");
class ItemService {
    static get itemAttributes() {
        return ["id", "name", "description", "eta", "price", "status"];
    }
    static get item() {
        return ItemService._item;
    }
    add({ id, parlorId, name, description, category, eta, price, status, }) {
        if (!name || !parlorId || !eta || !price)
            return null;
        return item_1.Item.create({
            id,
            parlorId,
            name,
            description,
            category,
            eta,
            price,
            status,
        }).then((u) => this.getItemById(u.id));
    }
    read({ parlorId, offset, limit }) {
        return item_1.Item.findAll({
            where: { parlorId: parlorId },
            attributes: ItemService.itemAttributes,
            offset: offset || 0,
            limit: limit || 10,
        });
    }
    getItemById(id) {
        return item_1.Item.findByPk(id, {
            attributes: ItemService.itemAttributes,
        });
    }
}
exports.ItemService = ItemService;
