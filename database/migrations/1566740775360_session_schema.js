"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class SessionSchema extends Schema {
  up() {
    this.alter("sessions", table => {
      // alter table
      table
        .enu("type", ["SHARED_SPACE", "ROOM", "VIP_DESK"])
        .defaultTo("SHARED_SPACE")
        .alter();
    });
  }

  down() {
    this.alter("sessions", table => {
      // reverse alternations
      table.enu("type", ["SHARED_SPACE", "ROOM"]).defaultTo("SHARED_SPACE");
    });
    this.alter("sessions", table => {
      // reverse alternations
      table.dropColumn("type");
    });
  }
}

module.exports = SessionSchema;
