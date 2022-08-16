import * as Sequelize from 'sequelize'
import { INTEGER } from 'sequelize'
import { Json } from 'sequelize/types/utils'
import { sequelize } from '../instances/sequelize'

export interface OrderAddModel {
    id: string
    userId: string
    category: string
    services: Json
    amount: number
    discount: number
    coupon: string
    parlor: Json
    from: string
    till: string
    duration: number
    status: string
}

export interface OrderModel extends Sequelize.Model<OrderModel, OrderAddModel> {
    id: string
    userId: string
    category: string
    services: string
    amount: string
    discount: number
    coupon: number
    parlor: string
    from: string
    till: string
    status: string
    createdAt: string,
    updatedAt: string
}

export interface OrderReadModel {
    userId: string
    offset: number
    limit: number
}

export interface OrderViewModel {
    id: string
    userId: string
    category: string
    services: string
    amount: string
    discount: number
    coupon: number
    parlor: string
    from: string
    till: string
    status: string
    createdAt: string,
    updatedAt: string
}

export const Order = sequelize.define<OrderModel, OrderAddModel>('order', {
    id: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    userId: Sequelize.STRING,
    category: Sequelize.STRING,
    services: Sequelize.JSON,
    amount: Sequelize.INTEGER,
    discount: Sequelize.INTEGER,
    coupon: Sequelize.STRING,
    parlor: Sequelize.JSON,
    from: Sequelize.STRING,
    till: Sequelize.STRING,
    duration: Sequelize.INTEGER,
    status: Sequelize.STRING,
}, {
    tableName: 'orders'
})