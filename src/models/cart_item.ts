import * as Sequelize from 'sequelize'
import { Model } from 'sequelize'
import { sequelize } from '../instances/sequelize'
import { Cart } from './cart'
import { CartQuantity } from './cart_quantity'
import { Item } from './item'
import { Parlor } from './parlor'
import { User } from './user'

export interface CartItemAddModel {
    id: string
    cartId: string
    parlorId: string
    productId: string
}

export interface CartItemModel extends Sequelize.Model<CartItemModel, CartItemAddModel> {
    id: string
    cartId: string
    parlorId: string
    productId: string
    createdAt: string
    updatedAt: string
}

export interface CartItemReadModel {
    userId: string
    offset: number
    limit: number
}

export interface CartItemViewModel {
    id: string
    cartId: string
    parlorId: string
    productId: string
}

export const CartItem = sequelize.define<CartItemModel, CartItemAddModel>('cart_item', {
    id: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    cartId: Sequelize.STRING,
    parlorId: Sequelize.STRING,
    productId: Sequelize.STRING
}, {
    tableName: 'cart_item'
})