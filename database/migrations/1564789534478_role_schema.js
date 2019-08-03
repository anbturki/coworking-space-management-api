"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class RoleSchema extends Schema {
  up() {
    this.create("roles", table => {
      table.increments();
      table.string("role").notNullable();
      table.json("permissions");
      table.boolean("active").defaultTo(false);
      table.integer("created_by").unsigned();
      table.timestamps();
    });
  }

  down() {
    this.drop("roles");
  }
}

module.exports = RoleSchema;
