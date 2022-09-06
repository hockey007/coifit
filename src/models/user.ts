import * as Sequelize from 'sequelize'
import { sequelize } from '../instances/sequelize'
import { Cart } from './cart'

export interface UserAddModel {
    id?: string
    mobile: string
}

export interface UserModel extends Sequelize.Model<UserModel, UserAddModel> {
    id: string
    name: string
    mobile: string
    email: string
    gender: string
    dob: string
    location: Array<number>
    photo: string
    status: string
    createdAt: string
    updatedAt: string
}

export interface UserViewModel {
    id: string
    mobile: string
}

export interface UserVerifyModel {
    mobile: string
    otp: string
}

export const User = sequelize.define<UserModel, UserAddModel>('user', {
    id: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    mobile: Sequelize.STRING
}, {
    tableName: 'users'
})