import * as Sequelize from 'sequelize'
import { Json } from 'sequelize/types/utils'
import { sequelize } from '../instances/sequelize'

export interface MailSendModel {
    id?: string
    from: string
    recipient: string
    subject: string
    hmessage: string
    pmessage: string
    type: string
}

export interface MailModel extends Sequelize.Model<MailModel, MailSendModel> {
    id: string
    from: string
    recipient: string
    subject: string
    hmessage: string
    pmessage: string
    type: string
    createdAt: string
    updatedAt: string
}

export interface MailViewModel {
    id: string
    from: string
    recipient: string
    subject: string
    hmessage: string
    pmessage: string
    type: string
    createdAt: string
    updatedAt: string
}

export const Mail = sequelize.define<MailModel, MailSendModel>('mail', {
    id: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    from: {
        type: Sequelize.STRING
    },
    recipient: {
        type: Sequelize.STRING
    },
    subject: {
        type: Sequelize.STRING
    },
    hmessage: {
        type: Sequelize.STRING
    },
    pmessage: {
        type: Sequelize.STRING
    },
    type: {
        type: Sequelize.STRING
    }
}, {
    tableName: 'mails'
})