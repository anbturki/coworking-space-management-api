"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Role = use("App/Models/Role");
const permissionsFile = use("App/permissions.data");
/**
 * Resourceful controller for interacting with roles
 */
class RoleController {
  /**
   * Show a list of all roles.
   * GET roles
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request }) {
    return Role.query()
      .orderFilter(request)
      .fetch();
  }

  /**
   * Create/save a new role.
   * POST roles
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, auth }) {
    const authUser = await auth.getUser();
    const role = new Role();
    const data = request.post();
    // Get the fields from model filter and pass it the model instance
    Role.filters.forEach(key => {
      if (Object.keys(request.only(key)).length) {
        role[key] = data[key];
      }
    });
    role.created_by = authUser.id;
    await role.save();
    return role;
  }

  /**
   * Display a single role.
   * GET roles/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response }) {
    const isEx = await Role.find(params.id);
    if (!isEx) {
      return response.status(404).json({
        message: "Role not found"
      });
    }
    return (
      (await Role.query()
        .where({ id: params.id })
        .orderFilter(request)
        .first()) || {}
    );
  }

  /**
   * Update role details.
   * PUT or PATCH roles/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    const role = await Role.find(params.id);
    if (!role) {
      return response.status(404).json({
        message: "Role not found"
      });
    }
    const data = request.post();
    // Get the fields from model filter and pass it the model instance
    Role.filters.forEach(key => {
      if (Object.keys(request.only(key)).length) {
        role[key] = data[key];
      }
    });
    await role.save();
    return role;
  }

  /**
   * Delete a role with id.
   * DELETE roles/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    const role = await Role.find(params.id);
    if (!role) {
      return response.status(404).json({
        message: "Role not found"
      });
    }
    await role.delete();
    return {
      message: "Role deleted."
    };
  }
  async getPermissions({ response }) {
    return response.json(permissionsFile);
  }
}

module.exports = RoleController;
