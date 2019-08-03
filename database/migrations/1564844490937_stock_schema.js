"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class StockSchema extends Schema {
  up() {
    this.create("stocks", table => {
      table.increments();
      table.string("item").notNullable();
      table.integer("in_stock").defaultTo(0);
      table.integer("in_inventory").defaultTo(0);
      table.integer("sale_unit_price").defaultTo(0);
      table.integer("buy_unit_price").defaultTo(0);
      table.integer("created_by").unsigned();
      table.string("icon").nullable();
      table.boolean("active").defaultTo(true);
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
