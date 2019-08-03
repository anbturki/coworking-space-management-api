"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Stock extends Model {
  static get filters() {
    return [
      "id",
      "item",
      "in_stock",
      "in_inventory",
      "created_by",
      "category_id",
      "sale_unit_price",
      "buy_unit_price",
      "icon"
    ];
  }
  static boot() {
    super.boot();
    this.addTrait("QueryFilter");
  }

  category() {
    return this.belongsTo("App/Models/StockCategory", "category_id");
  }
}

module.exports = Stock;
