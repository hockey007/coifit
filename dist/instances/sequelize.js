"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
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
exports.sequelize = new sequelize_1.Sequelize(db, username, password, {
    dialect: "mysql",
    port: 3306,
});
exports.sequelize.authenticate();
