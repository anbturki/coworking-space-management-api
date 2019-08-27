"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Expense = use("App/Models/Expense");
/**
 * Resourceful controller for interacting with expenses
 */
class ExpenseController {
  /**
   * Show a list of all expenses.
   * GET expenses
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    return Expense.query()
      .orderFilter(request)
      .fetch();
  }

  /**
   * Create/save a new expense.
   * POST expenses
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const authUser = await auth.getUser();
    const expense = new Expense();
    const data = request.post();
    // Get the fields from model filter and pass it the model instance
    Expense.filters.forEach(key => {
      if (Object.keys(request.only(key)).length) {
        expense[key] = data[key];
      }
    });
    expense.created_by = authUser.id;
    await expense.save();
    return expense;
  }

  /**
   * Display a single expense.
   * GET expenses/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
    const isEx = await Expense.find(params.id);
    if (!isEx) {
      return response.status(404).json({
        message: "Expense not found"
      });
    }
    return (
      (await Expense.query()
        .where({ id: params.id })
        .orderFilter(request)
        .first()) || {}
    );
  }

  /**
   * Update expense details.
   * PUT or PATCH expenses/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    const expense = await Expense.find(params.id);
    if (!expense) {
      return response.status(404).json({
        message: "Expense not found"
      });
    }
    const data = request.post();
    // Get the fields from model filter and pass it the model instance
    Expense.filters.forEach(key => {
      if (Object.keys(request.only(key)).length) {
        expense[key] = data[key];
      }
    });
    await expense.save();
    return expense;
  }

  /**
   * Delete a expense with id.
   * DELETE expenses/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    const expense = await Expense.find(params.id);
    if (!expense) {
      return response.status(404).json({
        message: "Expense not found"
      });
    }
    await expense.delete();
    return {
      message: "Expense deleted."
    };
  }
}

module.exports = ExpenseController;
