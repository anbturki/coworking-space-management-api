"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Role extends Model {
  static get filters() {
    return ["id", "role", "active", "permissions", "created_by"];
  }
  static boot() {
    super.boot();
    this.addTrait("QueryFilter");
  }
}

module.exports = Role;
