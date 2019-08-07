"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Session = use("App/Models/Session");
const WorkDay = use("App/Models/WorkDay");
/**
 * Resourceful controller for interacting with sessions
 */
class SessionController {
  /**
   * Show a list of all sessions.
   * GET sessions
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request }) {
    return Session.query()
      .orderFilter(request)
      .fetch();
  }

  /**
   * Create/save a new session.
   * POST sessions
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, auth, response }) {
    const authUser = await auth.getUser();
    const session = new Session();
    const data = request.post();
    const workDay = await WorkDay.find(data.work_day);
    if (workDay.status === "CLOSED") {
      return response.status(400).json({
        message: "You can not assinge session to a closed day"
      });
    }
    // Get the fields from model filter and pass it the model instance
    Session.filters.forEach(key => {
      if (Object.keys(request.only(key)).length) {
        session[key] = data[key];
      }
    });
    session.checked_in_by = authUser.id;
    await session.save();
    return session;
  }

  /**
   * Display a single session.
   * GET sessions/:id
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
        message: "Session not found"
      });
    }
    return (
      (await Session.query()
        .where({ id: params.id })
        .orderFilter(request)
        .first()) || {}
    );
  }
  /**
   * Update session details.
   * PUT or PATCH sessions/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    const session = await Session.find(params.id);
    if (!session) {
      return response.status(404).json({
        message: "item not found"
      });
    }
    const data = request.post();
    // Get the fields from model filter and pass it the model instance
    Session.filters.forEach(key => {
      if (Object.keys(request.only(key)).length) {
        session[key] = data[key];
      }
    });
    await session.save();
    return session;
  }
  /**
   * Delete a session with id.
   * DELETE sessions/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    const session = await Session.find(params.id);
    if (!session) {
      return response.status(404).json({
        message: "Session not found"
      });
    }
    await session.delete();
    return {
      message: "Session deleted."
    };
  }
}

module.exports = SessionController;
