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
  return { greeting: "@dastack2" };
});

Route.group(() => {
  // Staff route
  Route.resource("staff", "StaffController")
    .validator(
      new Map([
        [["staff.store"], ["StaffStore"]],
        ["staff.update", "StaffUpdate"]
      ])
    )
    .apiOnly();
  // Roles route
  Route.resource("roles", "RoleController")
    .validator(
      new Map([
        [["roles.store"], ["RoleStore"]],
        ["roles.update", "RoleUpdate"]
      ])
    )
    .apiOnly();
  // Stock route
  Route.resource("stocks", "StockController")
    .validator(
      new Map([
        [["stocks.store"], ["StockCategoryController"]],
        ["stocks.update", "StockUpdate"]
      ])
    )
    .apiOnly();
  // Stock Category route
  Route.resource("stockCategories", "StockCategoryController")
    .validator(
      new Map([
        [["stockCategories.store"], ["StockCategoryStore"]],
        ["stockCategories.update", "StockCategoryUpdate"]
      ])
    )
    .apiOnly();
  // Bundles route
  Route.resource("bundles", "BundleController")
    .validator(
      new Map([
        [["bundles.store"], ["BundleStore"]],
        ["bundles.update", "BundleUpdate"]
      ])
    )
    .apiOnly();
  // Bundles route
  Route.resource("locations", "LocationController")
    .validator(
      new Map([
        [["locations.store"], ["LocationStore"]],
        ["locations.update", "LocationUpdate"]
      ])
    )
    .apiOnly();
  // work days route
  Route.resource("workdays", "WorkDayController").apiOnly();
  Route.post("workdays/open", "WorkDayController.openDay").middleware(
    "acl:workdays,openDay"
  );
  Route.post("workdays/close/:id", "WorkDayController.closeDay").middleware(
    "acl:workdays,closeday"
  );
  // Auth route
})
  .prefix("api")
  .middleware("auth");
// Auth route
Route.post("api/login", "AuthController.login").middleware("guest");

// Generate Admin Statically
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
