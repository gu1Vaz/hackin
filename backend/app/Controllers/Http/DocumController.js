'use strict'

const Documentacao = use("App/Models/Documentacao");
const {validateAll}= use('Validator') ;
class DocumController {

  async index ({ request, response, view }) {
  }


  async create ({ request, response, view }) {
  }


  async store ({auth, request, response }) {
    
  }


  async show ({ params, request, response, view }) {
    const item = await Documentacao.findOrFail(params.id);
    return item;
  }


  async edit ({ params, request, response, view }) {
  }


  async update ({ params, request, response }) {
  }


  async destroy ({ params, request, response }) {
  }
}

module.exports = DocumController
