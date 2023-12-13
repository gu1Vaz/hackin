'use strict'

const Fornecedor = use("App/Models/Fornecedor");

class AuthControllerFornecedor {
  async registrar({ request }) {
    const data = request.only(["username", "email", "password"]);

    const fornecedor = await Fornecedor.create(data);

    return fornecedor;
  }

  async autenticar({ request, auth }) {
    const { email, password } = request.all();
    const retorno = {};
    let token;
    if (token = await auth.authenticator('fornecedor').attempt(email, password)) {
      const user = await Fornecedor.findBy('email', email)
      retorno.token = token.token
      retorno.user = user.username;
      retorno.id = user.id;
    } else {
      retorno.data = "E-mail ou senha Incorretos";
    }
    return retorno;
  }

}

module.exports = AuthControllerFornecedor
