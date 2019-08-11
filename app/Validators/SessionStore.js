"use strict";
const BaseValidator = use("App/Validators/BaseValidator");
class SessionStore extends BaseValidator {
  get rules() {
    return {
      work_day: "required|exists:work_days,id",
      checked_in_at: "date",
      code: "required",
      type: "required|in:SHARED_SPACE,ROOM",
      bundle_id: "required_when:type,ROOM|exists:bundles,id",
      location_id: "required|exists:locations,id"
    };
  }
}

module.exports = SessionStore;
