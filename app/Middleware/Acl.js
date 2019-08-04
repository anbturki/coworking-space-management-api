"use strict";
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class Acl {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle({ request, params, response, auth }, next, props) {
    let { user } = auth;
    const [model, action] = props;
    let role = await user.role().fetch();
    user = user.toJSON();
    role = role && role.toJSON();
    let permissions = {};
    try {
      permissions = JSON.parse(role.permissions);
    } catch (error) {}
    const segment = `/api/${model}`;
    const method = request.method();
    const url = request.url();
    // Check if model match the current URL request
    // FetchAll Request
    if (url === segment && method === "GET") {
      // Check if there is permissions
      return Acl.hasAccess(permissions, model, response, "fetchAll", next);
    }
    // FetchOne Request
    else if (url === `${segment}/${params.id}` && method === "GET") {
      return Acl.hasAccess(permissions, model, response, "fetchOne", next);
    }
    // Store Request
    else if (url === `${segment}` && method === "POST") {
      return Acl.hasAccess(permissions, model, response, "create", next);
    }
    // Update Request
    else if (
      url === `${segment}/${params.id}` &&
      ["PATCH", "PUT"].includes(method)
    ) {
      return Acl.hasAccess(permissions, model, response, "update", next);
    }
    // DELETE REQUEST
    else if (url === `${segment}/${params.id}` && ["DELETE"].includes(method)) {
      return Acl.hasAccess(permissions, model, response, "delete", next);
    } else if (model && action) {
      return Acl.hasAccess(permissions, model, response, action, next);
    }
    // call next to advance the request
    return await next();
  }
  // Check if staff has action to access the route
  static async hasAccess(permissions, model, response, action, next) {
    // Check if there is permissions
    if (!Object.keys(permissions).length) {
      return response.status(401).send("You are not authorized.");
    }
    if (
      Array.isArray(permissions[model]) &&
      permissions[model].includes(action)
    ) {
      return await next();
    } else {
      return response.status(401).send("You are not authorized.");
    }
  }
}

module.exports = Acl;
