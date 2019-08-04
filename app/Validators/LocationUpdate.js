"use strict";
const BaseValidator = use("App/Validators/BaseValidator");
class BundleUpdate extends BaseValidator {
  get rules() {
    const id = this.ctx.params.id;
    const request = this.ctx.request;
    const isEx = field => !!Object.keys(request.only(field)).length;
    const rules = {
      location: `string|unique:locations,location,id,${id}`,
      active: "boolean"
    };

    if (isEx("location")) {
      rules.location += "|required";
    }
    return rules;
  }
}

module.exports = BundleUpdate;
