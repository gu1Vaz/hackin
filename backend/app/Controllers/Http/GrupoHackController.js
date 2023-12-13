'use strict'


const Grupo = use("App/Models/GrupoHack");

class GrupoHackController {

  async index ({ request, response, view }) {
    const grupos = await Grupo.all();
    return grupos;

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

module.exports = GrupoHackController
