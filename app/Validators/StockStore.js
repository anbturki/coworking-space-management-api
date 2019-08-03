"use strict";
const BaseValidator = use("App/Validators/BaseValidator");
class StockStore extends BaseValidator {
  get rules() {
    return {
      item: "required|string|unique:stocks,item",
      in_stock: "number",
      in_inventory: "number",
      buy_unit_price: "number",
      sale_unit_price: "number"
    };
  }
  get sanitizationRules() {
    return {
      in_stock: "to_int",
      in_inventory: "to_int",
      buy_unit_price: "to_int",
      sale_unit_price: "to_int"
    };
  }
}

module.exports = StockStore;
