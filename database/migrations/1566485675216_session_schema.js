"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class SessionSchema extends Schema {
  up() {
    this.alter("sessions", table => {
      // alter table
      table
        .datetime("checked_in_at")
        .defaultTo(this.fn.now())
        .alter();
    });
  }

  down() {
    this.alter("sessions", table => {
      // reverse alternations
      table.datetime("checked_in_at").defaultTo(this.fn.now());
    });
    //Remove Column
    this.alter("sessions", table => {
      table.dropColumn("checked_in_at");
    });
  }
}

module.exports = SessionSchema;
