"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class LocationSchema extends Schema {
  up() {
    this.create("locations", table => {
      table.increments();
      table
        .string("location")
        .unique()
        .notNullable();
      table.boolean("active").defaultTo(true);
      table.integer("created_by").unsigned();
      table.timestamps();
    });
  }

  down() {
    this.drop("locations");
  }
}

module.exports = LocationSchema;
