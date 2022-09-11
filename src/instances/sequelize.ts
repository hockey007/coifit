import { Sequelize } from 'sequelize';
import { ItemModel, MailModel, OrdersModel, OtpModel, ParlorModel, PersonModel, UserModel } from '../models';
import { CartItemModel } from '../models/cartItemModel';
import { CartModel } from '../models/cartModel';
import { CartQuantityModel } from '../models/cartQuantityModel';

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
const Cart = CartModel(sequelize);
const CartItem = CartItemModel(sequelize);
const CartQuantity = CartQuantityModel(sequelize);
const Mail = MailModel(sequelize);
const Order = OrdersModel(sequelize);
const Otp = OtpModel(sequelize);
const Parlor = ParlorModel(sequelize);
const User = UserModel(sequelize);
const Person = PersonModel(sequelize);

sequelize.sync();
// sequelize.sync({ force: true });

(async () => {
    Cart.hasOne(User, { foreignKey: 'userId' });
    Cart.belongsTo(CartItem);

    // CartItem.belongsTo(Cart, { foreignKey: 'cartId' });


    CartItem.hasOne(Cart, { foreignKey: 'cartId' });
    CartItem.hasOne(Parlor, { foreignKey: 'parlorId' });
    CartItem.hasOne(Item, { foreignKey: 'productId' });
    CartItem.belongsTo(CartQuantity);
    CartQuantity.hasOne(CartItem, { foreignKey: 'cartItemId' });

    Parlor.belongsTo(CartItem);

    CartQuantity.hasOne(Person, { foreignKey: 'personId' });

    Item.belongsTo(CartItem);

    User.belongsTo(Cart);
    console.log('Hi');
})().then(async () => {
    var cart: any = await Cart.findOne({
        include: {
            model: CartItem,
        }
    });
    console.log(cart);
    // var cartItem = await cart.getCartItems();

    // console.log(cartItem);
});

export { sequelize, Item, Mail, Order, User, Otp, Parlor, Person };
