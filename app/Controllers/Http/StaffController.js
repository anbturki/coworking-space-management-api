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
  async index({ request }) {
    return User.query()
      .orderFilter(request)
      .fetch();
  }

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
  async show({ params, request, response }) {
    const isEx = await User.find(params.id);
    if (!isEx) {
      return response.status(404).json({
        message: "User not found"
      });
    }
    return (
      (await User.query()
        .where({ id: params.id })
        .orderFilter(request)
        .first()) || {}
    );
  }

  /**
   * Update staff details.
   * PUT or PATCH staff/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    const user = await User.find(params.id);
    if (!user) {
      return response.status(404).json({
        message: "User not found"
      });
    }
    const data = request.post();
    // Get the fields from model filter and pass it the model instance
    User.filters.forEach(key => {
      if (Object.keys(request.only(key)).length) {
        user[key] = data[key];
      }
    });
    await user.save();
    return user;
  }

  /**
   * Delete a staff with id.
   * DELETE staff/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, response }) {
    const user = await User.find(params.id);
    if (!user) {
      return response.status(404).json({
        message: "User not found"
      });
    }
    await user.delete();
    return {
      message: "User deleted."
    };
  }
}

module.exports = StaffController;
