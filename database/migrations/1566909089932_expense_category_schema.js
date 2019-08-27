"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ExpenseCategorySchema extends Schema {
  up() {
    this.create("expense_categories", table => {
      table.increments();
      table
        .string("name")
        .notNullable()
        .unique();
      table.integer("created_by").unsigned();
      table.boolean("active").defaultTo(true);
      table.timestamps();
    });
  }

  down() {
    this.drop("expense_categories");
  }
}

module.exports = ExpenseCategorySchema;
