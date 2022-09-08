import { Order} from '../instances/sequelize'

export class OrderService {
    private readonly _saltRounds = 12
    private readonly _jwtSecret = '0.rfyj3n9nzh'

    static get orderAttributes() {
        return ['id', 'userId', 'category', 'services', 'amount', 'discount', 'coupon', 'parlor', 'from', 'till', 'status', 'createdAt', 'updatedAt']
    }
    private static _order
    static get order() {
        return OrderService._order
    }

    add({ id, userId, category, services, amount, discount, coupon, parlor, from, till, duration, status }: any) {
        if (!userId || !category || !services || !amount || !discount || !coupon || !parlor || !from || !till || !duration) return null;
        return Order.create({
            id,
            userId,
            category,
            services,
            amount,
            discount,
            coupon,
            parlor,
            from,
            till,
            duration,
            status
        }).then((o) => this.getOrderById(o!.id));
    }

    getOrderById(id: string) {
        return Order.findByPk(id, {
            attributes: OrderService.orderAttributes
        })
    }
}