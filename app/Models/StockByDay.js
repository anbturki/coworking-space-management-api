"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class StockByDay extends Model {
  static boot() {
    super.boot();
    this.addTrait("QueryFilter");
  }
}

module.exports = StockByDay;
