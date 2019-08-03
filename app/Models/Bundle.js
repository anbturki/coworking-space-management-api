"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Bundle extends Model {
  static get filters() {
    return [
      "id",
      "name",
      "co_working_hours",
      "meeting_hours",
      "price",
      "type",
      "active"
    ];
  }

  static boot() {
    super.boot();
    this.addTrait("QueryFilter");
  }
}

module.exports = Bundle;
