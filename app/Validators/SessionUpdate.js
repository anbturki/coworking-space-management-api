"use strict";
const BaseValidator = use("App/Validators/BaseValidator");
class SessionStore extends BaseValidator {
  get rules() {
    return {
      work_day: "exists:work_days,id",
      checked_in_at: "date",
      checked_in_out: "date",
      type: "in:SHARED_SPACE,ROOM,VIP_DESK",
      status: "in:ACTIVE,CLOSED",
      bundle_id: "exists:bundles,id",
      location_id: "exists:locations,id"
    };
  }
}

module.exports = SessionStore;
