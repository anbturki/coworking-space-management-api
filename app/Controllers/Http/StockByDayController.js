"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const StockByDayStock = use("App/Models/StockByDay");
/**
 * Resourceful controller for interacting with stockbydays
 */
class StockByDayController {
  /**
   * Show a list of all stockbydays.
   * GET stockbydays
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request }) {
    return StockByDayStock.query()
      .orderFilter(request)
      .fetch();
  }

  /**
   * Display a single stockbyday.
   * GET stockbydays/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response }) {
    const isEx = await Session.find(params.id);
    if (!isEx) {
      return response.status(404).json({
        message: "Stock by day not found"
      });
    }
    return (
      (await StockByDay.query()
        .where({ id: params.id })
        .orderFilter(request)
        .first()) || {}
    );
  }
}

module.exports = StockByDayController;
