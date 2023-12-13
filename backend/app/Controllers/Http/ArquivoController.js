'use strict'
const Repositorio = use("App/Models/Repositorio");
const Pasta = use("App/Models/Pasta");
const Arquivo = use("App/Models/Arquivo");
class ArquivoController {

  async index ({  params }) {
    const pasta = await Pasta.find(params.id)
    const arquivos = await pasta.arquivos().fetch()
    return arquivos;
  }


  async create ({ request, response, view }) {
  }


  async store ({auth, request, response }) {
     await auth.getUser()
     const valores = request.only(["nome","pasta_id","repositorio_id"]);
     const repositorio = await Repositorio.findOrFail(valores.repositorio_id);

     if(auth.user.id == repositorio.admin_id){
        const data ={"nome":valores.nome, "pasta_id":valores.pasta_id,"codigo":"baianuuuu"}
        const arquivo = await Arquivo.create(data);
        return arquivo;
     }
  }


  async show ({ params, request, response, view }) {
    const arquivo = await Pasta.findOrFail(params.id);
    return arquivo;

  }

  async edit ({ params, request, response, view }) {
  }


  async update ({ params, request, response }) {
  }


  async destroy ({ params, request, response }) {
  }
}

module.exports = ArquivoController
