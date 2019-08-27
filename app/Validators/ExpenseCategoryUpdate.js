"use strict";
const BaseValidator = use("App/Validators/BaseValidator");
class ExpenseCategoryUpdate extends BaseValidator {
  get rules() {
    const id = this.ctx.params.id;
    const request = this.ctx.request;
    const isEx = field => !!Object.keys(request.only(field)).length;
    const rules = {
      name: `unique:expense_categories,name,id,${id}`,
      active: "boolean"
    };
    if (isEx("name")) {
      rules["name"] += "|required";
    }

    return rules;
  }
}

module.exports = ExpenseCategoryUpdate;
