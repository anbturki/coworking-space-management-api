"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Order extends Model {
  static get filters() {
    return [
      "id",
      "item_name",
      "item_price",
      "item_id",
      "qty",
      "session_id",
      "staff_id",
      "member_id",
      "order_type",
      "created_by"
    ];
  }
  static boot() {
    super.boot();
    this.addTrait("QueryFilter");
  }
  addedBy() {
    return this.belongsTo("App/Models/User", "created_by", "id");
  }
}

module.exports = Order;
