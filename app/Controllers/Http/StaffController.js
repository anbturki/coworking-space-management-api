"use strict";
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

// import
const User = use("App/Models/User");

/**
 * Resourceful controller for interacting with staff
 */
class StaffController {
  /**
   * Show a list of all staff.
   * GET staff
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {}

  /**
   * Create/save a new staff.
   * POST staff
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, auth }) {
    const authUser = await auth.getUser();
    const user = new User();
    const data = request.post();
    // Get the fields from model filter and pass it the model instance
    User.filters.forEach(key => {
      if (Object.keys(request.only(key)).length) {
        user[key] = data[key];
      }
    });
    user.created_by = authUser.id;
    await user.save();
    return user;
  }

  /**
   * Display a single staff.
   * GET staff/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {}

  /**
   * Update staff details.
   * PUT or PATCH staff/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {}

  /**
   * Delete a staff with id.
   * DELETE staff/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {}
}

module.exports = StaffController;
