"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Bundle = use("App/Models/Bundle");
/**
 * Resourceful controller for interacting with bundles
 */
class BundleController {
  /**
   * Show a list of all bundles.
   * GET bundles
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request }) {
    return Bundle.query()
      .orderFilter(request)
      .fetch();
  }

  /**
   * Create/save a new bundle.
   * POST bundles
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, auth }) {
    const authUser = await auth.getUser();
    const bundle = new Bundle();
    const data = request.post();
    // Get the fields from model filter and pass it the model instance
    Bundle.filters.forEach(key => {
      if (Object.keys(request.only(key)).length) {
        bundle[key] = data[key];
      }
    });
    bundle.created_by = authUser.id;
    await bundle.save();
    return bundle;
  }

  /**
   * Display a single bundle.
   * GET bundles/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
    const isEx = await Bundle.find(params.id);
    if (!isEx) {
      return response.status(404).json({
        message: "Bundle not found"
      });
    }
    return (
      (await Bundle.query()
        .where({ id: params.id })
        .orderFilter(request)
        .first()) || {}
    );
  }

  /**
   * Update bundle details.
   * PUT or PATCH bundles/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    const bundle = await Bundle.find(params.id);
    if (!bundle) {
      return response.status(404).json({
        message: "Bundle not found"
      });
    }
    const data = request.post();
    // Get the fields from model filter and pass it the model instance
    Bundle.filters.forEach(key => {
      if (Object.keys(request.only(key)).length) {
        bundle[key] = data[key];
      }
    });
    await bundle.save();
    return bundle;
  }

  /**
   * Delete a bundle with id.
   * DELETE bundles/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    const bundle = await Bundle.find(params.id);
    if (!bundle) {
      return response.status(404).json({
        message: "bundle not found"
      });
    }
    await bundle.delete();
    return {
      message: "Bundle deleted."
    };
  }
}

module.exports = BundleController;
