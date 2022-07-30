'use strict'

const User = use("App/Models/User");

class AuthController {
  async registrar({ request }) {
    const data = request.only(["username", "email", "password"]);

    const user = await User.create(data);

    return user;
  }

  async autenticar({ request, auth }) {
    const { email, password } = request.all();
    const retorno = {};
    let token;
    if (token = await auth.attempt(email, password)) {
      const user = await User.findBy('email', email)
      retorno.token = token.token
      retorno.user = user.username;
      retorno.id = user.id;
    } else {
      retorno.data = "E-mail ou senha Incorretos";
    }
    return retorno;
  }

}

module.exports = AuthController
