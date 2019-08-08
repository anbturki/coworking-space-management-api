"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const WorkDay = use("App/Models/WorkDay");
const StockByDay = use("App/Models/StockByDay");
const Database = use("Database");
/**
 * Resourceful controller for interacting with workdays
 */
class WorkDayController {
  /**
   * Show a list of all workdays.
   * GET workdays
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response }) {
    return WorkDay.query()
      .orderFilter(request)
      .fetch();
  }

  /**
   * Create/save a new workday.
   * POST workdays
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, auth }) {
    const authUser = await auth.getUser();
    const workDay = new WorkDay();
    const data = request.post();
    // Get the fields from model filter and pass it the model instance
    WorkDay.filters.forEach(key => {
      if (Object.keys(request.only(key)).length) {
        workDay[key] = data[key];
      }
    });
    workDay.opened_by = authUser.id;
    await workDay.save();
    return workDay;
  }

  /**
   * Display a single workday.
   * GET workdays/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response }) {
    const isEx = await WorkDay.find(params.id);
    if (!isEx) {
      return response.status(404).json({
        message: "Work day not found"
      });
    }
    return (
      (await WorkDay.query()
        .where({ id: params.id })
        .orderFilter(request)
        .first()) || {}
    );
  }

  /**
   * Update workday details.
   * PUT or PATCH workdays/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    const workDay = await WorkDay.find(params.id);
    if (!workDay) {
      return response.status(404).json({
        message: "Work day not found"
      });
    }
    const data = request.post();
    // Get the fields from model filter and pass it the model instance
    WorkDay.filters.forEach(key => {
      if (Object.keys(request.only(key)).length) {
        workDay[key] = data[key];
      }
    });
    await workDay.save();
    return workDay;
  }
  /**
   * Delete a workday with id.
   * DELETE workdays/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    const workDay = await WorkDay.find(params.id);
    if (!workDay) {
      return response.status(404).json({
        message: "Work day not found"
      });
    }
    await workDay.delete();
    return {
      message: "Work day deleted."
    };
  }
  /**
   * Open a new day
   * POST workdays/open
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async openDay({ response, auth }) {
    const day = await WorkDay.query()
      .where({ status: "WORKING" })
      .first();
    if (day) {
      return response.status(400).json({
        message: "There is a day already opened."
      });
    }
    const user = await auth.getUser();
    const workDay = new WorkDay();
    workDay.opened_by = user.id;
    await workDay.save();
    const stock = await Database.select(
      "in_stock as open_qty",
      "id as item_id"
    ).from("stocks");
    stock.forEach(model => {
      model["work_day_id"] = workDay.id;
    });
    await StockByDay.createMany(stock);
    return workDay;
  }
  /**
   * Close day
   * POST workdays/close
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async closeDay({ response, auth, params }) {
    const day = await WorkDay.find(params.id);
    if (!day || day.status === "CLOSED") {
      return response.status(400).json({
        message: "there is no opened day for that id"
      });
    }
    // Save close day stock
    const stock = await Database.select("in_stock as close_qty").from("stocks");
    // Update close day quantity in Transaction to safe update
    const trx = await Database.beginTransaction();
    const queries = [];
    stock.forEach(item => {
      const query = StockByDay.query()
        .where({ work_day_id: params.id })
        .update(item)
        .transacting(trx);
      queries.push(query);
    });
    try {
      const res = await Promise.all(queries);
      trx.commit();
    } catch (error) {
      trx.rollback();
    }

    // Get authenticated user
    const user = await auth.getUser();
    day.status = "CLOSED";
    day.closed_by = user.id;
    day.closed_at = Date.now();
    await day.save();
    return day;
  }
}

module.exports = WorkDayController;
