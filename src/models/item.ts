import * as Sequelize from 'sequelize'
import { sequelize } from '../instances/sequelize'

export interface ItemAddModel {
    id: string
    parlorId: string
    name: string
    description: string
    category: string
    eta: number
    price: number
    status: string
}

export interface ItemModel extends Sequelize.Model<ItemModel, ItemAddModel> {
    id: string
    parlorId: string
    name: string
    description: string
    category: string
    eta: number
    price: number
    status: string
    createdAt: string
    updatedAt: string
}

export interface ItemReadModel {
    parlorId: string
    offset: number
    limit: number
}

export interface ItemViewModel {
    id: string
    name: string
    description: string
    eta: number
    price: number
    status: string
}

export const Item = sequelize.define<ItemModel, ItemAddModel>('item', {
    id: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    parlorId: Sequelize.STRING,
    name: Sequelize.STRING,
    description: Sequelize.STRING,
    category: Sequelize.STRING,
    eta: Sequelize.INTEGER,
    price: Sequelize.INTEGER,
    status: Sequelize.STRING
}, {
    tableName: 'items'
})