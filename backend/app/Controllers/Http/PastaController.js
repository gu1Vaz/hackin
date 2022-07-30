'use strict'

const Repositorio = use("App/Models/Repositorio");
const Pasta = use("App/Models/Pasta");
class PastaController {

  async index ({params }) {
    const repositorio = await Repositorio.find(params.id)
    const pastas = await repositorio.pastas().fetch()
    return pastas;
  }


  async create ({ request, response, view }) {
  }


  async store ({auth, request, response }) {
     await auth.getUser()
     const valores = request.only(["nome","repositorio_id"]);
     const repositorio = await Repositorio.findOrFail(valores.repositorio_id);

     if(auth.user.id == repositorio.admin_id){
        const data ={"nome":valores.nome, "repositorio_id":valores.repositorio_id}
        const pasta = await Pasta.create(data);
        return pasta;
     }

  }


  async show ({ params}) {
    const pasta = await Pasta.findOrFail(params.id);
    return pasta;

  }


  async edit ({ params, request, response, view }) {
  }


  async update ({ params, request, response }) {
  }


  async destroy ({ params, request, response }) {
  }
}

module.exports = PastaController
