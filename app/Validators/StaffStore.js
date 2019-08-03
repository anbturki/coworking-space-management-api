"use strict";
const BaseValidator = use("App/Validators/BaseValidator");
class StaffStore extends BaseValidator {
  get rules() {
    return {
      password: "required",
      phone: "required|phone,EGY|unique:users,phone",
      name: "required",
      role_id: "exists:roles,id"
    };
  }
}

module.exports = StaffStore;
