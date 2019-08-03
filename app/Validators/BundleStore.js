"use strict";
const BaseValidator = use("App/Validators/BaseValidator");
class BundleStore extends BaseValidator {
  get rules() {
    return {
      name: "required|string|unique:bundles,name",
      active: "boolean",
      co_working_hours: "number|requiredWithoutAny:meeting_hours",
      meeting_hours: "number|requiredWithoutAny:co_working_hours",
      price: "number|required",
      type: "required|in:SHARED_SPACE,ROOM",
      active: "boolean"
    };
  }
  get sanitizationRules() {
    return {
      co_working_hours: "to_int",
      meeting_hours: "to_int",
      price: "to_int"
    };
  }
}

module.exports = BundleStore;
