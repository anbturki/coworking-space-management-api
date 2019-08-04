"use strict";
const BaseValidator = use("App/Validators/BaseValidator");
class LocationStore extends BaseValidator {
  get rules() {
    return {
      location: "required|string|unique:locations,location",
      active: "boolean"
    };
  }
}

module.exports = LocationStore;
