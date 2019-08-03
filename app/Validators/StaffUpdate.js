"use strict";
const BaseValidator = use("App/Validators/BaseValidator");
class StaffUpdate extends BaseValidator {
  get rules() {
    const id = this.ctx.params.id;
    const request = this.ctx.request;
    const isNull = field => request.input(field) === null;
    const isEx = field => !!Object.keys(request.only(field)).length;
    const rules = {
      phone: `phone,EGY|unique:users,phone,id,${id}`,
      role_id: "exists:roles,id",
      name: "required",
      password: "required"
    };
    if (!isEx("name")) {
      delete rules.name;
    }
    if (!isEx("password")) {
      delete rules.password;
    }
    if (isEx("phne")) {
      rules.phone += ",required";
    }
    return rules;
  }
}

module.exports = StaffUpdate;
