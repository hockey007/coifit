import * as Bluebird from 'Bluebird'
import { Order, OrderAddModel, OrderViewModel } from '../models/order'

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

    add({ id, userId, category, services, amount, discount, coupon, parlor, from, till, duration, status }: OrderAddModel) {
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
        }) as unknown as Bluebird<OrderViewModel>
    }
}