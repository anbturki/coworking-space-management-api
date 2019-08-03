"use strict";
const User = use("App/Models/User");
/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.get("/", () => {
  return { greeting: "Hello world in JSON" };
});

Route.group(() => {
  Route.resource("staff", "StaffController").apiOnly();
}).prefix("api");

Route.get("admin/generate", async () => {
  const admin = await User.query()
    .where({ phone: "01111469466" })
    .first();
  if (admin) {
    return {
      message: "The admin is already created",
      user: admin
    };
  }
  const user = await User.create({
    name: "Ali Turki",
    phone: "01111469466",
    password: "password"
  });
  return {
    message: "Admin created successfully.",
    user
  };
});
