"use strict";
const BaseValidator = use("App/Validators/BaseValidator");
class OrderStore extends BaseValidator {
  get rules() {
    return {
      item_id: "exists:stocks,id",
      qty: "required|number",
      session_id: "requiredWhen:order_type,SESSION|exists:sessions,id",
      staff_id: "requiredWhen:order_type,STAFF|exists:users,id",
      member_id: "requiredWhen:order_type,MEMBER|exists:users,id",
      order_type: "required|in:SESSION,STAFF,MEMBER,GUEST"
    };
  }
  get sanitizationRules() {
    return {
      qty: "to_int"
    };
  }
}

module.exports = OrderStore;
