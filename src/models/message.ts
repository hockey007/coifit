import * as Sequelize from 'sequelize'
import { sequelize } from '../instances/sequelize'

export interface MessageSendModel {
    id?: string
    recipient: string
    message: string
    type: string
    requestId?: string
}

export interface MessageModel extends Sequelize.Model<MessageModel, MessageSendModel> {
    id: string
    recipient: string
    message: string
    type: string
    requestId: string
}

export interface MessageViewModel {
    id: string
    recipient: string
    message: string
    type: string
    requestId: string
    createdAt: string
    updatedAt: string
}

export const Message = sequelize.define<MessageModel, MessageSendModel>('message', {
    id: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    recipient: {
        type: Sequelize.STRING
    },
    message: {
        type: Sequelize.STRING
    },
    type: {
        type: Sequelize.STRING
    },
    requestId: {
        type: Sequelize.STRING
    },
}, {
    tableName: 'messages'
})