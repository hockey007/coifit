import * as Sequelize from 'sequelize'
import { sequelize } from '../instances/sequelize'
import { CartItem } from './cart_item'

export interface ParlorAddModel {
    id: string
    mobile: string
    password: string
}

export interface ParlorModel extends Sequelize.Model<ParlorModel, ParlorAddModel> {
    id: string
    mobile: string
    password: string
    createdAt: string
    updatedAt: string
}

export interface ParlorViewModel {
    id: string
    mobile: string
}

export interface ParlorReadModel {
    categoryId: string
    offset: number
    limit: number
}

export const Parlor = sequelize.define<ParlorModel, ParlorAddModel>('parlor', {
    id: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    mobile: Sequelize.STRING,
    password: Sequelize.STRING
}, {
    tableName: 'parlors'
})