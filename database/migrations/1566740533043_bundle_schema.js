"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class BundleSchema extends Schema {
  up() {
    this.alter("bundles", table => {
      // alter table
      table.enu("type", ["SHARED_SPACE", "ROOM", "VIP_DESK"]).alter();
    });
  }

  down() {
    this.alter("bundles", table => {
      // reverse alternations
      table.enu("type", ["SHARED_SPACE", "ROOM"]);
    });
    this.alter("bundles", table => {
      // reverse alternations
      table.dropColumn("type");
    });
  }
}

module.exports = BundleSchema;
