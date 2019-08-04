"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Location extends Model {
  static get filters() {
    return ["id", "location", "created_by", "active"];
  }

  static boot() {
    super.boot();
    this.addTrait("QueryFilter");
  }
}

module.exports = Location;
