"use strict";
const BaseValidator = use("App/Validators/BaseValidator");
class ExpenseCategoryStore extends BaseValidator {
  get rules() {
    return {
      name: "string|unique:expense_categories,name",
      active: "boolean"
    };
  }
}

module.exports = ExpenseCategoryStore;
