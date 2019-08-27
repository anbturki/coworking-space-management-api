"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ExpenseSchema extends Schema {
  up() {
    this.create("expenses", table => {
      table.increments();
      table.integer("expenses").notNullable();
      table.enu("type", ["EXPENSES", "STOCK"]).defaultTo("EXPENSES");
      table.integer("created_by").unsigned();
      table.integer("qty").defaultTo(0);
      table
        .integer("stock_id")
        .unsigned()
        .nullable();
      table
        .integer("work_day")
        .unsigned()
        .nullable();
      table
        .integer("category_id")
        .unsigned()
        .nullable();
      table.text("comment").nullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("expenses");
  }
}

module.exports = ExpenseSchema;
