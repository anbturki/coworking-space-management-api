"use strict";
const User = use("App/Models/User");
class AuthController {
  async login({ request, auth, response }) {
    const { phone, password } = request.post();
    const user = await User.query()
      .where("phone", phone)
      .first();
    // check if user exists
    if (!user || user.type !== "STAFF") {
      return response
        .status(401)
        .json({ message: "user is not authenticated" });
    }
    try {
      const token = await auth.attempt(phone, password);
      return token;
    } catch (error) {
      return response
        .status(401)
        .json({ message: "user is not authenticated" });
    }
  }
}

module.exports = AuthController;
