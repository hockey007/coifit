import { Sequelize } from 'sequelize';
import { ItemModel, MailModel, OrdersModel, OtpModel, ParlorModel, PersonModel, UserModel } from '../models';

const database = process.env.MYSQL_DB;
const username = 'root';
const password = '';

// export const sequelize = new Sequelize(db, username, password, {
//   dialect: "mysql",
//   port: 3306
// });

const sequelize = new Sequelize(`${process.env.MYSQL_URI}/${database}` || `mysql://${username}:${password}@localhost/${database}`, {
    dialect: 'mysql',
    // logging: false
});

// sequelize.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

// sequelize.query(`USE ${database}`);


const Item = ItemModel(sequelize);
const Mail = MailModel(sequelize);
const Order = OrdersModel(sequelize);
const Otp = OtpModel(sequelize)
const Parlor = ParlorModel(sequelize);
const User = UserModel(sequelize);
const Person = PersonModel(sequelize);

sequelize.sync()


export { sequelize, Item, Mail, Order, User,Otp,Parlor,Person };
