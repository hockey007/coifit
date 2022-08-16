import * as Sequelize from 'sequelize'
import { DATE } from 'sequelize'
import { sequelize } from '../instances/sequelize'

export interface OtpAddModel {
    id?: number
    mobile: string
    otp: string
    type: string
}
export interface OtpModel extends Sequelize.Model<OtpModel, OtpAddModel> {
    mobile: string
    otp: string
    type: string
    createdAt: string
    updatedAt: string
}
export const Otp = sequelize.define<OtpModel, OtpAddModel>('otp', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    mobile: {
        type: Sequelize.STRING,
    },
    otp: {
        type: Sequelize.STRING
    },
    type: {
        type: Sequelize.STRING
    }
}, {
    tableName: 'otp'
})