"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class WorkDay extends Model {
  static get filters() {
    return ["id", "opened_at", "closed_at", "opened_by", "closed_by", "status"];
  }
  static boot() {
    super.boot();
    this.addTrait("QueryFilter");
  }
  static get dates() {
    return super.dates.concat(["opened_at", "closed_at"]);
  }
}

module.exports = WorkDay;
