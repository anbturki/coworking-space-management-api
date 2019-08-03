"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class StockCategorySchema extends Schema {
  up() {
    this.create("stock_categories", table => {
      table.increments();
      table
        .string("name")
        .notNullable()
        .unique();
      table.integer("created_by").unsigned();
      table.boolean("active").defaultTo(true);
      table.timestamps();
    });
  }

  down() {
    this.drop("stock_categories");
  }
}

module.exports = StockCategorySchema;
