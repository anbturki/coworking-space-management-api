"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class StockByDaySchema extends Schema {
  up() {
    this.table("stock_by_days", table => {
      // alter table
      table.integer("open_inventory_qty").notNullable();
      table.integer("close_inventory_qty").nullable();
    });
  }

  down() {
    this.table("stock_by_days", table => {
      // reverse alternations
      table.dropColumn("open_inventory_qty");
      table.dropColumn("close_inventory_qty");
    });
  }
}

module.exports = StockByDaySchema;
