"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class OrderSchema extends Schema {
  up() {
    this.create("orders", table => {
      table.increments();
      table.string("item_name").notNullable();
      table.integer("item_price");
      table.integer("item_id");
      table.integer("qty");
      table
        .integer("session_id")
        .unsigned()
        .nullable();
      table
        .integer("staff_id")
        .unsigned()
        .nullable();
      table
        .integer("member_id")
        .unsigned()
        .nullable();
      table
        .enu("order_type", ["SESSION", "STAFF", "MEMBER", "GUEST"])
        .defaultTo("STAFF");
      table.integer("created_by").unsigned();
      table.timestamps();
    });
  }

  down() {
    this.drop("orders");
  }
}

module.exports = OrderSchema;
