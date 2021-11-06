"use strict";

const User = use("App/Models/User");

class UserController {
  //CRUD FUNCTIONS + Login
  async register({ request }) {
    const { email, password, memorable_question, answer } = request.all();
    console.log(email, password);
    await User.create({
      email,
      password,
      username: email,
      memorable_question,
      answer,
    });
    return this.login(...arguments);
  }

  async retrieve({}) {
    const users = await User.query().fetch();
    return users;
  }

  async updateUser({ request, response, params: { id } }) {
    const data = request.all();
    const user = await User.find(id);
    console.log(data.username);
    console.log(data.email);
    console.log(data.password);
    if (user) {
      user.username = data.username;
      user.email = data.email;
      user.password = data.password;
      user.memorable_question = data.memorable_question;
      user.answer = data.answer;
      await user.save();
      response.send({
        message: "user update successfully",
      });
    } else {
      response.send({
        message: "user Id Not Found",
      });
    }
  }

  async showUserById({ request, response, params: { id } }) {
    const user = await User.find(id);
    if (user) {
      response.send(user);
    } else {
      response.send({
        message: "user Id Not Found",
      });
    }
  }

  async showUserByEmail({ request, response, params: { email } }) {
    console.log(email);
    const user = await User.query().where("email", email).first();
    if (user) {
      response.send(user);
    } else {
      response.send({
        message: "user email Not Found",
      });
    }
  }

  async showUser({ request, response }) {
    return await User.all();
  }

  async destroy({ request, params, response }) {
    const { id } = params;
    const target_user = await User.find(id);
    if (target_user) {
      target_user.delete();
      response.send({
        message: "Delete user successfully",
      });
    } else {
      response.send({
        message: "user Id Not Found",
      });
    }
  }

  async login({ request, auth }) {
    const { email, password } = request.all();
    const token = await auth.attempt(email, password);
    return token;
  }

  async create({ request }) {
    const data = request.only(["username", "email", "password"]);

    const user = await User.create(data);

    return user;
  }
}

module.exports = UserController;
