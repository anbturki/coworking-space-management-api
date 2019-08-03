"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class StockSchema extends Schema {
  up() {
    this.create("stocks", table => {
      table.increments();
      table.string("item").notNullable();
      table.integer("in_stock");
      table.integer("in_inventory");
      table.integer("sale_unit_price");
      table.integer("buy_unit_price");
      table.integer("created_by").unsigned();
      table
        .integer("category_id")
        .unsigned()
        .defaultTo(0);
      table.timestamps();
    });
  }

  down() {
    this.drop("stocks");
  }
}

module.exports = StockSchema;
