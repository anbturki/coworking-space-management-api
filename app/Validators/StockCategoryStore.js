"use strict";
const BaseValidator = use("App/Validators/BaseValidator");
class StockCategoryStore extends BaseValidator {
  get rules() {
    return {
      name: "string|unique:stock_categories,name",
      active: "boolean"
    };
  }
}

module.exports = StockCategoryStore;
