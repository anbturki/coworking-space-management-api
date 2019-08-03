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
  // Staff route
  Route.resource("staff", "StaffController")
    .validator(
      new Map([
        [["staff.store"], ["StaffStore"]],
        ["staff.update", "StaffUpdate"]
      ])
    )
    .middleware("auth")
    .apiOnly();
  // Roles route
  Route.resource("roles", "RoleController")
    .validator(
      new Map([
        [["roles.store"], ["RoleStore"]],
        ["roles.update", "RoleUpdate"]
      ])
    )
    .middleware(["auth", "acl:roles"])
    .apiOnly();
  // Stock route
  Route.resource("stocks", "StockController")
    .validator(
      new Map([
        [["stocks.store"], ["StockCategoryController"]],
        ["stocks.update", "StockUpdate"]
      ])
    )
    .middleware(["auth"])
    .apiOnly();
  // Stock Category route
  Route.resource("stockCategories", "StockCategoryController")
    .validator(
      new Map([
        [["stockCategories.store"], ["StockCategoryStore"]],
        ["stockCategories.update", "StockCategoryUpdate"]
      ])
    )
    .middleware(["auth"])
    .apiOnly();
  // Bundles route
  Route.resource("bundles", "BundleController")
    .validator(
      new Map([
        [["bundles.store"], ["BundleStore"]],
        ["bundles.update", "BundleUpdate"]
      ])
    )
    .middleware(["auth"])
    .apiOnly();
  // Auth route
  Route.post("/login", "AuthController.login").middleware("guest");
}).prefix("api");

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
