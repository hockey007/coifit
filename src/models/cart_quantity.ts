import * as Sequelize from 'sequelize'
import { Model } from 'sequelize'
import { sequelize } from '../instances/sequelize'
import { CartItem } from './cart_item'
import { Person } from './person'
import { User } from './user'

export interface CartQuantityAddModel {
    id: string
    cartItemId: string
    personId: string
}

export interface CartQuantityModel extends Sequelize.Model<CartQuantityModel, CartQuantityAddModel> {
    id: string
    cartItemId: string
    personId: string
    createdAt: string
    updatedAt: string
}

export interface CartQuantityReadModel {
    userId: string
    offset: number
    limit: number
}

export interface CartQuantityViewModel {
    id: string
    cartItemId: string
    personId: string
}

export const CartQuantity = sequelize.define<CartQuantityModel, CartQuantityAddModel>('cart_quantity', {
    id: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    cartItemId: Sequelize.STRING,
    personId: Sequelize.STRING
}, {
    tableName: 'cart_quantity'
})