"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartService = void 0;
const sequelize_1 = require("../instances/sequelize");
const cart_1 = require("../models/cart");
class CartService {
    static get cartAttributes() {
        return ["id", "name", "description", "eta", "price", "status"];
    }
    static get cart() {
        return CartService._cart;
    }
    add({ id, userId, cartId, parlorId, productId }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!userId)
                return null;
            return sequelize_1.sequelize.sync({ alter: false }).then(() => __awaiter(this, void 0, void 0, function* () {
                // const cart = await Cart.create({id,userId});
                // const cartItem = await CartItem.create({id, cartId, parlorId, productId});
                var cart = yield cart_1.Cart.findOne();
                var cartItem = yield (cart === null || cart === void 0 ? void 0 : cart.getCartItems());
            })).catch((err) => {
                console.log(err);
            });
        });
    }
    read({ userId, offset, limit }) {
        return cart_1.Cart.findAll({
            where: { userId: userId },
            attributes: CartService.cartAttributes,
            offset: offset || 0,
            limit: limit || 10,
        });
    }
    getCartById(id) {
        return cart_1.Cart.findByPk(id, {
            attributes: CartService.cartAttributes,
        });
    }
}
exports.CartService = CartService;
