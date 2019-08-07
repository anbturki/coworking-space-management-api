"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Order = use("App/Models/Order");
const Stock = use("App/Models/Stock");
/**
 * Resourceful controller for interacting with orders
 */
class OrderController {
  /**
   * Show a list of all orders.
   * GET orders
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request }) {
    return Order.query()
      .orderFilter(request)
      .fetch();
  }

  /**
   * Create/save a new order.
   * POST orders
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, auth, response }) {
    const authUser = await auth.getUser();
    const order = new Order();
    const data = request.post();
    const stock = await Stock.find(data.item_id);
    if (stock.in_stock < data.qty) {
      return response.status(400).json({
        message: `${stock.in_stock} of ${stock.item} that only available.`
      });
    }
    // Get the fields from model filter and pass it the model instance
    Order.filters.forEach(key => {
      if (Object.keys(request.only(key)).length) {
        order[key] = data[key];
      }
    });
    order.item_name = stock.item;
    order.item_price = stock.sale_unit_price;
    order.created_by = authUser.id;
    await order.save();
    stock.in_stock = stock.in_stock - data.qty;
    await stock.save();
    return order;
  }
  /**
   * Display a single order.
   * GET orders/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response }) {
    const isEx = await Order.find(params.id);
    if (!isEx) {
      return response.status(404).json({
        message: "Order not found"
      });
    }
    return (
      (await Order.query()
        .where({ id: params.id })
        .orderFilter(request)
        .first()) || {}
    );
  }
  /**
   * Update order details.
   * PUT or PATCH orders/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    const order = await Order.find(params.id);
    if (!order) {
      return response.status(404).json({
        message: "Order not found"
      });
    }
    const data = request.post();
    // Get the fields from model filter and pass it the model instance
    Order.filters.forEach(key => {
      if (Object.keys(request.only(key)).length) {
        order[key] = data[key];
      }
    });
    await order.save();
    return order;
  }
  /**
   * Delete a order with id.
   * DELETE orders/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    const order = await Order.find(params.id);
    if (!order) {
      return response.status(404).json({
        message: "order not found"
      });
    }
    await order.delete();
    return {
      message: "order deleted."
    };
  }
}

module.exports = OrderController;
