"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class SessionSchema extends Schema {
  up() {
    this.table("sessions", table => {
      // alter table
      table.integer("stayed_hours").defaultTo(0);
    });
  }

  down() {
    this.table("sessions", table => {
      // reverse alternations
      table.dropColumn("stayed_hours");
    });
  }
}

module.exports = SessionSchema;
