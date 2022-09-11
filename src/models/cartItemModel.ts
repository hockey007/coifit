import * as Sequelize from 'sequelize';

export interface CartItemAddModel {
    id: string;
    cartId: string;
    parlorId: string;
    productId: string;
}

export interface CartItemModel extends Sequelize.Model<CartItemModel, CartItemAddModel> {
    id: string;
    cartId: string;
    parlorId: string;
    productId: string;
    createdAt: string;
    updatedAt: string;
}

export interface CartItemReadModel {
    userId: string;
    offset: number;
    limit: number;
}

export interface CartItemViewModel {
    id: string;
    cartId: string;
    parlorId: string;
    productId: string;
}

export const CartItemModel = (sequelize: Sequelize.Sequelize) =>
    sequelize.define<CartItemModel, CartItemAddModel>(
        'cart_item',
        {
            id: {
                type: Sequelize.STRING,
                primaryKey: true,
            },
            cartId: Sequelize.STRING,
            parlorId: Sequelize.STRING,
            productId: Sequelize.STRING,
        },
        {
            tableName: 'cart_item',
        }
    );
