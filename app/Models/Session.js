"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Session extends Model {
  static get filters() {
    return [
      "id",
      "work_day",
      "checked_in_at",
      "checked_out_at",
      "code",
      "status",
      "type",
      "bundle_id",
      "location_id",
      "checked_in_by",
      "checked_out_by"
    ];
  }
  static boot() {
    super.boot();
    this.addTrait("QueryFilter");
  }
  static get dates() {
    return super.dates.concat(["checked_in_at", "checked_out_at"]);
  }
}

module.exports = Session;
