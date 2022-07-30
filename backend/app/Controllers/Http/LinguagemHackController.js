'use strict'

const Linguagem = use("App/Models/LinguagemHack");
class LinguagemHackController {

  async index ({ request, response, view }) {
    const linguagens = await Linguagem.all();
    return linguagens;
  }


  async create ({ request, response, view }) {
  }


  async store ({ request, response }) {
  }


  async show ({ params, request, response, view }) {
  }


  async edit ({ params, request, response, view }) {
  }


  async update ({ params, request, response }) {
  }


  async destroy ({ params, request, response }) {
  }
}

module.exports = LinguagemHackController
