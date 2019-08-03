"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Stock = use("App/Models/Stock");
/**
 * Resourceful controller for interacting with stocks
 */
class StockController {
  /**
   * Show a list of all stocks.
   * GET stocks
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request }) {
    return Stock.query()
      .orderFilter(request)
      .fetch();
  }
  /**
   * Create/save a new stock.
   * POST stocks
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, auth }) {
    const authUser = await auth.getUser();
    const stock = new Stock();
    const data = request.post();
    // Get the fields from model filter and pass it the model instance
    Stock.filters.forEach(key => {
      if (Object.keys(request.only(key)).length) {
        stock[key] = data[key];
      }
    });
    stock.created_by = authUser.id;
    await stock.save();
    return stock;
  }
  /**
   * Display a single stock.
   * GET stocks/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response }) {
    const isEx = await Stock.find(params.id);
    if (!isEx) {
      return response.status(404).json({
        message: "Item not found"
      });
    }
    return (
      (await Stock.query()
        .where({ id: params.id })
        .orderFilter(request)
        .first()) || {}
    );
  }
  /**
   * Update stock details.
   * PUT or PATCH stocks/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    const stock = await Stock.find(params.id);
    if (!stock) {
      return response.status(404).json({
        message: "item not found"
      });
    }
    const data = request.post();
    // Get the fields from model filter and pass it the model instance
    Stock.filters.forEach(key => {
      if (Object.keys(request.only(key)).length) {
        stock[key] = data[key];
      }
    });
    await stock.save();
    return stock;
  }
  /**
   * Delete a stock with id.
   * DELETE stocks/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    const stock = await Stock.find(params.id);
    if (!stock) {
      return response.status(404).json({
        message: "item not found"
      });
    }
    await stock.delete();
    return {
      message: "stock deleted."
    };
  }
}

module.exports = StockController;
