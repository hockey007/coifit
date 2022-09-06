import { Sequelize } from "sequelize";

// import { User } from "../models/user";
// import { CartItem } from "../models/cart_item";
// import { Parlor } from "../models/parlor";
// import { Item } from "../models/item";
// import { CartQuantity } from "../models/cart_quantity";
// import { Person } from "../models/person";
// import { Cart } from "../models/cart";

const db = "coifit";
const username = "root";
const password = "";

export const sequelize = new Sequelize(db, username, password, {
  dialect: "mysql",
  port: 3306,
});

sequelize.authenticate();