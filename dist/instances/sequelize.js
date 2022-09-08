"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Person = exports.Parlor = exports.Otp = exports.User = exports.Order = exports.Mail = exports.Item = exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const models_1 = require("../models");
const database = process.env.MYSQL_DB;
const username = 'root';
const password = '';
// export const sequelize = new Sequelize(db, username, password, {
//   dialect: "mysql",
//   port: 3306
// });
const sequelize = new sequelize_1.Sequelize(`${process.env.MYSQL_URI}/${database}` || `mysql://${username}:${password}@localhost/${database}`, {
    dialect: 'mysql',
    port: 3306,
});
exports.sequelize = sequelize;
// sequelize.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);
// sequelize.query(`USE ${database}`);
const Item = (0, models_1.ItemModel)(sequelize);
exports.Item = Item;
const Mail = (0, models_1.MailModel)(sequelize);
exports.Mail = Mail;
const Order = (0, models_1.OrdersModel)(sequelize);
exports.Order = Order;
const Otp = (0, models_1.OtpModel)(sequelize);
exports.Otp = Otp;
const Parlor = (0, models_1.ParlorModel)(sequelize);
exports.Parlor = Parlor;
const User = (0, models_1.UserModel)(sequelize);
exports.User = User;
const Person = (0, models_1.PersonModel)(sequelize);
exports.Person = Person;
sequelize.sync({ force: true });
