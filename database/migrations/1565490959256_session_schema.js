"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class SessionSchema extends Schema {
  up() {
    this.table("sessions", table => {
      // alter table
      table
        .integer("time_cost")
        .unsigned()
        .defaultTo(0);
      table
        .integer("orders_cost")
        .unsigned()
        .defaultTo(0);
    });
  }

  down() {
    this.table("sessions", table => {
      // reverse alternations
      table.dropColumn("time_cost");
      table.dropColumn("orders_cost");
    });
  }
}

module.exports = SessionSchema;
