"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class UserSchema extends Schema {
  up() {
    this.table("users", table => {
      // alter table
      table.boolean("active").defaultTo(1);
    });
  }

  down() {
    this.table("users", table => {
      // reverse alternations
      table.dropColumn("active");
    });
  }
}

module.exports = UserSchema;
