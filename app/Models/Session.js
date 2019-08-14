"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");
const Bundle = use("App/Models/Bundle");
const moment = require("moment");
class Session extends Model {
  static get filters() {
    return [
      "id",
      "work_day",
      "checked_in_at",
      "checked_out_at",
      "code",
      "status",
      "type",
      "bundle_id",
      "location_id",
      "checked_in_by",
      "checked_out_by",
      "stayed_hours",
      "time_cost",
      "orders_cost"
    ];
  }
  static boot() {
    super.boot();
    this.addTrait("QueryFilter");
    // Hndle hook for fetch many sessions
    this.addHook("afterFetch", async sessions => {
      for (let session of sessions) {
        if (session.status === "CLOSED") {
          return;
        }
        const bundle = await Session.getSessionBundle(session);
        session.time_cost = (bundle && bundle.price) || 0;
      }
    });
    // Handle hook for one session
    this.addHook("afterFind", async session => {
      if (session.status === "CLOSED") {
        return;
      }
      const bundle = await Session.getSessionBundle(session);
      session.time_cost = (bundle && bundle.price) || 0;
    });
  }
  static get dates() {
    return super.dates.concat(["checked_in_at", "checked_out_at"]);
  }
  bundle() {
    return this.belongsTo("App/Models/Bundle");
  }
  orders() {
    return this.hasMany("App/Models/Order");
  }
  static async getSessionBundle(session) {
    // Stayed hours (Diff between now and checked_in_at)
    const hours = Session.calculateDuration(session.checked_in_at);
    session.stayed_hours = hours;
    if (session.type === "SHARED_SPACE") {
      return Session.handleSharedSpaceBundle(session);
    } else if (session.type === "ROOM") {
      return Session.handleRoomBundle(session);
    }
  }
  static async handleRoomBundle(session) {
    const bundle = await session.bundle().fetch();
    if (bundle.meeting_hours) {
      // if set a meeting hours, this bundle is fixed.
      // meeting hours = 2 and price 10. if user set 3 so, the price will be 15
      return {
        price: (session.stayed_hours / bundle.meeting_hours) * bundle.price
      };
    }
    return {
      price: bundle.price * session.stayed_hours
    };
  }
  static async handleSharedSpaceBundle(session) {
    // check if there is bundle for this time
    let currentBundle = await Bundle.query()
      .where({ co_working_hours: session.stayed_hours, type: "SHARED_SPACE" })
      .first();
    if (!currentBundle) {
      // otherwise it look for the max price
      return await Bundle.query()
        .max({
          price: "price"
        })
        .where("type", "shared_space")
        .first();
    }
    return currentBundle;
  }
  static calculateDuration(time) {
    const startTime = moment(time);
    const endTime = moment(new Date());
    const duration = moment.duration(endTime.diff(startTime));
    const hours = Math.floor(duration.asHours());
    return hours;
  }
}

module.exports = Session;
