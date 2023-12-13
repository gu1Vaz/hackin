'use strict'

const Repositorio = use("App/Models/Repositorio");
class RepoController {

  async index ({ request, response, view }) {

  }

  async create ({ request, response, view }) {
  }

  async store ({ auth,request, response }) {

  }


  async show ({ params, request, response, view }) {
    var item = await Repositorio.findOrFail(params.id);
    return item;
  }


  async edit ({ params, request, response, view }) {
  }


  async update ({ params, request, response }) {
  }

  async destroy ({ params, request, response }) {
  }
}

module.exports = RepoController
