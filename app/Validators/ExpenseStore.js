"use strict";
const BaseValidator = use("App/Validators/BaseValidator");
class ExpenseStore extends BaseValidator {
  get rules() {
    return {
      expenses: "required|number",
      qty: "requiredWhen:type,STOCK|number",
      stock_id: "requiredWhen:type,STOCK|exists:stocks,id",
      type: "required|in:STOCK,EXPENSES",
      work_day: "exists:work_days,id",
      category_id: "requiredWhen:type,EXPENSES"
    };
  }
  get sanitizationRules() {
    return {
      qty: "to_int"
    };
  }
}

module.exports = ExpenseStore;
