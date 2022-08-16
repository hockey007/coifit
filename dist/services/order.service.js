"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const orders_1 = require("../models/orders");
class OrderService {
    constructor() {
        this._saltRounds = 12;
        this._jwtSecret = '0.rfyj3n9nzh';
    }
    static get orderAttributes() {
        return ['id', 'userId', 'category', 'services', 'amount', 'discount', 'coupon', 'parlor', 'from', 'till', 'status', 'createdAt', 'updatedAt'];
    }
    static get order() {
        return OrderService._order;
    }
    add({ id, userId, category, services, amount, discount, coupon, parlor, from, till, duration, status }) {
        if (!userId || !category || !services || !amount || !discount || !coupon || !parlor || !from || !till || !duration)
            return null;
        return orders_1.Order.create({
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
        }).then((o) => this.getOrderById(o.id));
    }
    getOrderById(id) {
        return orders_1.Order.findByPk(id, {
            attributes: OrderService.orderAttributes
        });
    }
}
exports.OrderService = OrderService;
