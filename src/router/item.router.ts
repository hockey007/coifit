import { Router } from "express";
import { validationResult } from "express-validator";
import { ItemService } from "../services/item.service";
import { itemRules } from "../rules/item.rules";
import { ItemReadModel } from "../models/item";

export const itemRouter = Router();
const itemService = new ItemService();

itemRouter.post("/add", itemRules["addItem"], (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) return res.status(422).json(errors.array());
  const item = itemService.add(req.item);
  return item?.then((u) => res.json(u));
});

itemRouter.get("/read", itemRules["readItem"], (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) return res.status(422).json(errors.array());
  var params: ItemReadModel = {
    parlorId: req.query.parlorId,
    offset: req.params.offset,
    limit: req.params.limit
  };

  const items = itemService.read(params);
  items?.then((_items) => {
    var itemMap = {};

    _items.forEach(function(item) {
      itemMap[item.id] = item;
    });

    res.json({message: "Items retrieved successfully", data: itemMap});
  });
});