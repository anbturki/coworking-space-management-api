"use strict";
const BaseValidator = use("App/Validators/BaseValidator");
class BundleUpdate extends BaseValidator {
  get rules() {
    const id = this.ctx.params.id;
    const request = this.ctx.request;
    const isNull = field => request.input(field) === null;
    const isEx = field => !!Object.keys(request.only(field)).length;
    const rules = {
      name: `string|unique:bundles,name,id,${id}`,
      active: "boolean",
      co_working_hours: "number",
      meeting_hours: "number",
      price: "number",
      type: "in:SHARED_SPACE,ROOM,VIP_DESK"
    };

    if (isEx("name")) {
      rules.name += "|required";
    }
    if (isEx("price")) {
      rules.price += "|required";
    }
    if (isEx("type")) {
      rules.type += "|required";
    }
    return rules;
  }
}

module.exports = BundleUpdate;
