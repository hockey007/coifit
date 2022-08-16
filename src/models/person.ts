import * as Sequelize from 'sequelize'
import { sequelize } from '../instances/sequelize'

export interface PersonAddModel {
    id: string
    userId: string
    name: string
    age: number
    gender: string
    category: string
    tag?: string
}

export interface PersonModel extends Sequelize.Model<PersonModel, PersonAddModel> {
    id: string
    userId: string
    name: string
    age: number
    gender: Enumerator<string>
    category: Enumerator<string>
    tag?: string
    createdAt: string
    updatedAt: string
}

export interface PersonReadModel {
    userId: string
    offset: number
    limit: number
}

export interface PersonViewModel {
    id: string
    name: string
    age: number
    gender: Enumerator
    category: Enumerator
    tag?: string
}

export const Person = sequelize.define<PersonModel, PersonAddModel>('person', {
    id: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    userId: Sequelize.STRING,
    name: Sequelize.STRING,
    age: Sequelize.INTEGER,
    gender: Sequelize.STRING,
    category: Sequelize.STRING,
    tag: Sequelize.STRING,
}, {
    tableName: 'people'
})