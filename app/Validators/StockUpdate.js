"use strict";
const BaseValidator = use("App/Validators/BaseValidator");
class StockUpdate extends BaseValidator {
  get rules() {
    const id = this.ctx.params.id;
    const request = this.ctx.request;
    const isEx = field => !!Object.keys(request.only(field)).length;
    const rules = {
      item: `string|unique:stocks,item,id,${id}`,
      in_stock: "number",
      in_inventory: "number",
      buy_unit_price: "number",
      sale_unit_price: "number"
    };
    Object.keys(rules).forEach(field => {
      if (isEx(field)) {
        rules[field] += "|required";
      }
    });

    return rules;
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

module.exports = StockUpdate;
