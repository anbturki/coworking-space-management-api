"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class StockByDaySchema extends Schema {
  up() {
    this.create("stock_by_days", table => {
      table.increments();
      table
        .integer("item_id")
        .unsigned()
        .notNullable();
      table
        .integer("work_day_id")
        .unsigned()
        .notNullable();
      table.integer("qty_from_inventory").nullable();
      table.integer("open_qty");
      table.integer("close_qty").nullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("stock_by_days");
  }
}

module.exports = StockByDaySchema;
