"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class SessionSchema extends Schema {
  up() {
    this.create("sessions", table => {
      table.increments();
      table.integer("work_day").unsigned();
      table.datetime("checked_in_at").defaultTo(this.fn.now());
      table.datetime("checked_out_at").nullable();
      table.string("code");
      table.enu("status", ["ACTIVE", "CLOSED"]).defaultTo("ACTIVE");
      table.enu("type", ["SHARED_SPACE", "ROOM"]).defaultTo("SHARED_SPACE");
      table.integer("bundle_id").unsigned();
      table.integer("location_id").unsigned();
      table.integer("checked_in_by").unsigned();
      table
        .integer("checked_out_by")
        .unsigned()
        .nullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("sessions");
  }
}

module.exports = SessionSchema;
