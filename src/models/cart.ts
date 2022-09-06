import * as Sequelize from "sequelize";
import { Model } from "sequelize";
import { sequelize } from "../instances/sequelize";

export interface CartAddModel {
  id: string;
  userId: string;
}

export interface CartModel extends Sequelize.Model<CartModel, CartAddModel> {
  id: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CartReadModel {
  userId: string;
  offset: number;
  limit: number;
}

export interface CartViewModel {
  id: string;
  userId: string;
}

export const Cart = sequelize.define<CartModel, CartAddModel>(
  "cart",
  {
    id: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    userId: Sequelize.STRING,
  },
  {
    tableName: "cart",
  }
);
