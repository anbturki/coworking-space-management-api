"use strict";
const BaseValidator = use("App/Validators/BaseValidator");
class RoleUpdate extends BaseValidator {
  get rules() {
    const id = this.ctx.params.id;
    const request = this.ctx.request;
    const isNull = field => request.input(field) === null;
    const isEx = field => !!Object.keys(request.only(field)).length;
    const rules = {
      role: `string|unique:roles,role,id,${id}`,
      permissions: "json",
      active: "boolean"
    };

    if (isEx("role")) {
      rules.role += "|required";
    }
    return rules;
  }
}

module.exports = RoleUpdate;
