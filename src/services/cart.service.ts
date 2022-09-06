import * as Bluebird from "Bluebird";
import { Console } from "console";
import { sequelize } from "../instances/sequelize";
import { Cart, CartAddModel, CartReadModel, CartViewModel } from "../models/cart";

export class CartService {
  static get cartAttributes() {
    return ["id", "name", "description", "eta", "price", "status"];
  }
  private static _cart;
  static get cart() {
    return CartService._cart;
  }

  async add({
    id,
    userId,
    cartId,
    parlorId,
    productId
  }) {
    if (!userId) return null;
    return sequelize.sync({alter: false}).then(async () => {
      // const cart = await Cart.create({id,userId});
      // const cartItem = await CartItem.create({id, cartId, parlorId, productId});
      
      var cart:any = await Cart.findOne();
      var cartItem = await cart?.getCartItems();

    }).catch((err) => {
        console.log(err);
    });
  }

  read({ userId, offset, limit }: CartReadModel) {
    return Cart.findAll({
      where: { userId: userId },
      attributes: CartService.cartAttributes,
      offset: offset || 0,
      limit: limit || 10,
    });
  }

  getCartById(id: string) {
    return Cart.findByPk(id, {
      attributes: CartService.cartAttributes,
    }) as unknown as Bluebird<CartViewModel>;
  }
}
