"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Location = use("App/Models/Location");
/**
 * Resourceful controller for interacting with locations
 */
class LocationController {
  /**
   * Show a list of all locations.
   * GET locations
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request }) {
    return Location.query()
      .orderFilter(request)
      .fetch();
  }

  /**
   * Create/save a new location.
   * POST locations
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, auth }) {
    const authUser = await auth.getUser();
    const location = new Location();
    const data = request.post();
    // Get the fields from model filter and pass it the model instance
    Location.filters.forEach(key => {
      if (Object.keys(request.only(key)).length) {
        location[key] = data[key];
      }
    });
    location.created_by = authUser.id;
    await location.save();
    return location;
  }

  /**
   * Display a single location.
   * GET locations/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response }) {
    const isEx = await Location.find(params.id);
    if (!isEx) {
      return response.status(404).json({
        message: "Location not found"
      });
    }
    return (
      (await Location.query()
        .where({ id: params.id })
        .orderFilter(request)
        .first()) || {}
    );
  }

  /**
   * Update location details.
   * PUT or PATCH locations/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    const location = await Location.find(params.id);
    if (!location) {
      return response.status(404).json({
        message: "Location not found"
      });
    }
    const data = request.post();
    // Get the fields from model filter and pass it the model instance
    Location.filters.forEach(key => {
      if (Object.keys(request.only(key)).length) {
        location[key] = data[key];
      }
    });
    await location.save();
    return location;
  }

  /**
   * Delete a location with id.
   * DELETE locations/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    const location = await Location.find(params.id);
    if (!location) {
      return response.status(404).json({
        message: "Location not found"
      });
    }
    await location.delete();
    return {
      message: "Location deleted."
    };
  }
}

module.exports = LocationController;
