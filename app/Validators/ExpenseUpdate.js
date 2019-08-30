"use strict";
const BaseValidator = use("App/Validators/BaseValidator");
class ExpenseUpdate extends BaseValidator {
  get rules() {
    const id = this.ctx.params.id;
    const request = this.ctx.request;
    const isEx = field => !!Object.keys(request.only(field)).length;

    const rules = {
      expenses: "number",
      qty: "number",
      stock_id: "exists:stocks,id",
      type: "in:STOCK,EXPENSES",
      work_day: "exists:work_days,id"
    };
    Object.keys(rules).forEach(field => {
      if (isEx(field) && ["expenses", "type"].includes(field)) {
        rules[field] += "|required";
      } else if (isEx(field) && ["stock_id", "qty"].includes(field)) {
        rules[field] += "|requiredWhen:type,STOCK";
      } else if (isEx(field) && field === "category_id") {
        rules.category_id =
          "requiredWhen:type,EXPENSES|exists:expense_categories,id";
      }
    });
    return rules;
  }
  get sanitizationRules() {
    return {
      qty: "to_int"
    };
  }
}

module.exports = ExpenseUpdate;
