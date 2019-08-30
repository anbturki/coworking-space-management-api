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
  static boot() {
    super.boot();
    this.addTrait("QueryFilter");
  }

  category() {
    return this.belongsTo("App/Models/ExpenseCategory", "category_id");
  }
  stock() {
    return this.belongsTo("App/Models/Stock");
  }
  createdBy() {
    return this.belongsTo("App/Models/User", "created_by", "id");
  }
}

module.exports = Expense;
