"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../models/user");
const cart_item_1 = require("../models/cart_item");
const parlor_1 = require("../models/parlor");
const item_1 = require("../models/item");
const cart_quantity_1 = require("../models/cart_quantity");
const person_1 = require("../models/person");
const cart_1 = require("../models/cart");
exports.default = () => {
    cart_1.Cart.hasOne(user_1.User, { foreignKey: "userId" });
    cart_1.Cart.belongsTo(cart_item_1.CartItem);
    cart_item_1.CartItem.hasOne(cart_1.Cart, { foreignKey: "cartId" });
    cart_item_1.CartItem.hasOne(parlor_1.Parlor, { foreignKey: "parlorId" });
    cart_item_1.CartItem.hasOne(item_1.Item, { foreignKey: "productId" });
    cart_item_1.CartItem.belongsTo(cart_quantity_1.CartQuantity);
    cart_quantity_1.CartQuantity.hasOne(cart_item_1.CartItem, { foreignKey: "cartItemId" });
    parlor_1.Parlor.belongsTo(cart_item_1.CartItem);
    cart_quantity_1.CartQuantity.hasOne(person_1.Person, { foreignKey: "personId" });
    item_1.Item.belongsTo(cart_item_1.CartItem);
    user_1.User.belongsTo(cart_1.Cart);
    console.log("Hi");
    cart_1.Cart.findOne().then((cart) => {
        console.log(cart);
        var cartItem = cart.getCartItems();
        console.log(cartItem);
    });
};
// GOING OUT CHANGES REVERTED BACK TO CHECK OTHER POSSIBLE WAY
// GO ON WITH IMPLEMENTATION WE DISCUSSED EARLIER
