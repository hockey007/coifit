import { v4 as uuidv4 } from 'uuid';
import { ItemAddModel, ItemReadModel} from "../models/itemModel";

export const itemRules = {
  addItem: [
    (req: any, res, next) => {
      var parlorId: string = req.body.parlorId;
      var name: string = req.body.name;
      var description: string = req.body.description;
      var category: string = req.body.category;
      var eta: number = req.body.eta;
      var price: number = req.body.price;

      if(!name || !parlorId || !category || !eta || !price)
        res.status(500).json({ error: true, message: "Invalid Request" });

      if (name.length == 0) {
        res.json({ error: true, message: "Name can't be empty" });
      } else if(description.length == 0) {
        res.json({ error: true, message: "Description can't be empty" });
      } else if(category.length == 0) {
        res.json({ error: true, message: "Category can't be empty" });
      } else if(eta <= 0) {
        res.json({ error: true, message: "Enter a valid time taken by the service" });
      } else if(price <= 0) {
        res.json({ error: true, message: "Enter a valid price for the service" });
      } else {
        var itemData: ItemAddModel = {
          id: uuidv4(),
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
    (req: any, res, next) => {
      var parlorId: string = req.query.parlorId;

      if(!parlorId)
        res.status(500).json({ error: true, message: "Invalid Request" });
        
      next();
    },
  ],
};
