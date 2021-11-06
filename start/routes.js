"use strict";

const { route } = require("@adonisjs/framework/src/Route/Manager");
const UserController = require("../app/Controllers/Http/UserController");
//const UserController = require("App/Controllers/Http/UserController");

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

Route.post("/register", "UserController.register");
Route.post("/login", "UserController.login");

Route.get("/retrieve", "UserController.retrieve");
Route.get("showUser", "UserController.showUser");
Route.get("showUserById/:id", "UserController.showUserById");
Route.put("updateUser/:id", "UserController.updateUser");
Route.delete("/delete/:id", "UserController.destroy");
Route.get("/showUserByEmail/:email", "UserController.showUserByEmail");
