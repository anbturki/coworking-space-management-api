"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const StockCategory = use("App/Models/StockCategory");
const Stock = use("App/Models/Stock");
/**
 * Resourceful controller for interacting with stockcategories
 */
class StockCategoryController {
  /**
   * Show a list of all stockcategories.
   * GET stockcategories
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request }) {
    return StockCategory.query()
      .orderFilter(request)
      .fetch();
  }

  /**
   * Create/save a new stockcategory.
   * POST stockcategories
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, auth }) {
    const authUser = await auth.getUser();
    const category = new StockCategory();
    const data = request.post();
    // Get the fields from model filter and pass it the model instance
    StockCategory.filters.forEach(key => {
      if (Object.keys(request.only(key)).length) {
        category[key] = data[key];
      }
    });
    category.created_by = authUser.id;
    await category.save();
    return category;
  }

  /**
   * Display a single stockcategory.
   * GET stockcategories/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response }) {
    const isEx = await StockCategory.find(params.id);
    if (!isEx) {
      return response.status(404).json({
        message: "Category not found"
      });
    }
    return (
      (await StockCategory.query()
        .where({ id: params.id })
        .orderFilter(request)
        .first()) || {}
    );
  }

  /**
   * Update stockcategory details.
   * PUT or PATCH stockcategories/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    const category = await StockCategory.find(params.id);
    if (!category) {
      return response.status(404).json({
        message: "category not found"
      });
    }
    const data = request.post();
    // Get the fields from model filter and pass it the model instance
    StockCategory.filters.forEach(key => {
      if (Object.keys(request.only(key)).length) {
        category[key] = data[key];
      }
    });
    await category.save();
    return category;
  }

  /**
   * Delete a stockcategory with id.
   * DELETE stockcategories/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    const category = await StockCategory.find(params.id);
    if (!category) {
      return response.status(404).json({
        message: "item not found"
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

module.exports = StockCategoryController;
