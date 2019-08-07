"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class WorkDaySchema extends Schema {
  up() {
    this.create("work_days", table => {
      table.increments();
      table.datetime("opened_at").defaultTo(this.fn.now());
      table.datetime("closed_at").nullable();
      table
        .integer("opened_by")
        .unsigned()
        .notNullable();
      table
        .integer("closed_by")
        .unsigned()
        .nullable();
      table.enu("status", ["WORKING", "CLOSED"]).defaultTo("WORKING");
      table.timestamps();
    });
  }

  down() {
    this.drop("work_days");
  }
}

module.exports = WorkDaySchema;
