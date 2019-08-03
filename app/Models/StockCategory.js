"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class StockCategory extends Model {
  static get filters() {
    return ["id", "name", "active"];
  }
  static boot() {
    super.boot();
    this.addTrait("QueryFilter");
  }
  items() {
    return this.hasMany("App/Models/Stock", "id", "category_id");
  }
}

module.exports = StockCategory;
