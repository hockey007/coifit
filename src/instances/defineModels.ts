import { sequelize } from "./sequelize";

import { User } from "../models/user";
import { CartItem } from "../models/cart_item";
import { Parlor } from "../models/parlor";
import { Item } from "../models/item";
import { CartQuantity } from "../models/cart_quantity";
import { Person } from "../models/person";
import { Cart } from "../models/cart";

export default () => {
  Cart.hasOne(User, { foreignKey: "userId" });
  Cart.belongsTo(CartItem);

  CartItem.hasOne(Cart, { foreignKey: "cartId" });
  CartItem.hasOne(Parlor, { foreignKey: "parlorId" });
  CartItem.hasOne(Item, { foreignKey: "productId" });
  CartItem.belongsTo(CartQuantity);

  CartQuantity.hasOne(CartItem, { foreignKey: "cartItemId" });

  Parlor.belongsTo(CartItem);

  CartQuantity.hasOne(Person, { foreignKey: "personId" });

  Item.belongsTo(CartItem);

  User.belongsTo(Cart);
  console.log("Hi");

  Cart.findOne().then((cart: any) => {
    console.log(cart);

    var cartItem = cart.getCartItems();
    console.log(cartItem);
  });
};
// GOING OUT CHANGES REVERTED BACK TO CHECK OTHER POSSIBLE WAY
// GO ON WITH IMPLEMENTATION WE DISCUSSED EARLIER