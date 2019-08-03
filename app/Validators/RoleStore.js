"use strict";
const BaseValidator = use("App/Validators/BaseValidator");
class RoleStore extends BaseValidator {
  get rules() {
    return {
      role: "required|string|unique:roles,role",
      permissions: "json",
      active: "boolean"
    };
  }
}

module.exports = RoleStore;
