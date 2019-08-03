"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class BundleSchema extends Schema {
  up() {
    this.create("bundles", table => {
      table.increments();
      table
        .string("name")
        .notNullable()
        .unique();
      table.integer("co_working_hours").defaultTo(0);
      table.integer("meeting_hours").defaultTo(0);
      table.integer("price").notNullable();
      table.boolean("active").defaultTo(true);
      table.integer("created_by").unsigned();
      table.enu("type", ["SHARED_SPACE", "ROOM"]);
      table.timestamps();
    });
  }

  down() {
    this.drop("bundles");
  }
}

module.exports = BundleSchema;
