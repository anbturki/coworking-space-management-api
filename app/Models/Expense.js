"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Expense extends Model {
  static get filters() {
    return [
      "id",
      "expenses",
      "type",
      "qty",
      "stock_id",
      "work_day",
      "category_id",
      "comment"
    ];
  }
}

module.exports = Expense;
