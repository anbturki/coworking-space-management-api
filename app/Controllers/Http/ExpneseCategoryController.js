"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const ExpenseCategory = use("App/Models/ExpenseCategory");
/**
 * Resourceful controller for interacting with expnesecategories
 */
class ExpneseCategoryController {
  /**
   * Show a list of all expnesecategories.
   * GET expnesecategories
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    return ExpenseCategory.query()
      .orderFilter(request)
      .fetch();
  }

  /**
   * Create/save a new expnesecategory.
   * POST expnesecategories
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const authUser = await auth.getUser();
    const category = new ExpenseCategory();
    const data = request.post();
    // Get the fields from model filter and pass it the model instance
    ExpenseCategory.filters.forEach(key => {
      if (Object.keys(request.only(key)).length) {
        category[key] = data[key];
      }
    });
    category.created_by = authUser.id;
    await category.save();
    return category;
  }

  /**
   * Display a single expnesecategory.
   * GET expnesecategories/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
    const isEx = await ExpenseCategory.find(params.id);
    if (!isEx) {
      return response.status(404).json({
        message: "Category not found"
      });
    }
    return (
      (await ExpenseCategory.query()
        .where({ id: params.id })
        .orderFilter(request)
        .first()) || {}
    );
  }

  /**
   * Update expnesecategory details.
   * PUT or PATCH expnesecategories/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    const category = await ExpenseCategory.find(params.id);
    if (!category) {
      return response.status(404).json({
        message: "category not found"
      });
    }
    const data = request.post();
    // Get the fields from model filter and pass it the model instance
    ExpenseCategory.filters.forEach(key => {
      if (Object.keys(request.only(key)).length) {
        category[key] = data[key];
      }
    });
    await category.save();
    return category;
  }

  /**
   * Delete a expnesecategory with id.
   * DELETE expnesecategories/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    const category = await ExpenseCategory.find(params.id);
    if (!category) {
      return response.status(404).json({
        message: "category not found"
      });
    }
    await Stock.query()
      .where("category_id", params.id)
      .update({ category_id: 0 });
    await category.delete();
    return {
      message: "category deleted."
    };
  }
}

module.exports = ExpneseCategoryController;
