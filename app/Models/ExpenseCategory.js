"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class ExpenseCategory extends Model {
  static get filters() {
    return ["id", "name", "active"];
  }
  static boot() {
    super.boot();
    this.addTrait("QueryFilter");
  }
  expenses() {
    return this.hasMany("App/Models/Expense", "id", "category_id");
  }
}

module.exports = ExpenseCategory;
