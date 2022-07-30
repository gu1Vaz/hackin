'use strict'

const Repositorio = use("App/Models/Repositorio");
const Documentacao = use("App/Models/Documentacao");
const Hack = use("App/Models/Hack");
const Grupo = use("App/Models/GrupoHack");
const Pasta = use("App/Models/Pasta");
const Topico = use("App/Models/Topico");

const {validateAll}= use('Validator') ;

class HackController {

  async index ({ request, response, view }) {
  }


  async create ({ request, response, view }) {

  }

  async hacksByIdGrupo ({ params }) {
    const grupo = await Grupo.find(params.id)
    const hacks = await grupo.hacks().fetch()
    return hacks;
  }
  async novosHacks ({  }) {
    const novos = await Hack.query().orderBy('created_at','desc').limit(10).fetch()
    return novos;
  }
  async meusHacks ({ auth }) {
    await auth.getUser()
    const meus = await auth.user.hacks().orderBy('created_at','desc').fetch()
    return meus;
  }


  async store ({auth, request, response}) {
    const rules = {
      nome: 'required|max:24|unique:hacks,nome',
      desc: 'required|max:255',
      tipo: 'required|max:255',
      grupo:'required',
      linguagem:'required'
    }
    const messages = {
      'nome.unique' : 'Hack com esse nome ja existe',
      'nome.required':'De um nome ao seu hack',
      'tipo.required':'Defina o tipo do da Documentação do hack',
      'nome.max':'Maximo de 24 caracters no nome',
      'desc.required':'De uma descricao ao seu hack',
      'desc.max':'Maximo de 255 caracters na descrição',
      'grupo.required':'Selecione em qual grupo se encaixa seu hack',
      'linguagem.required':'Selecione a linguagem usada'
    }

    const validation = await validateAll(request.all(), rules, messages)

    if (validation.fails()) {
      return response.status(400).send(validation.messages());
    }
    await auth.getUser()

    const valores = request.only(["nome","desc","tipo","grupo","linguagem"]);

    const dataDoc = {"admin_id":auth.user.id}
    const doc = await Documentacao.create(dataDoc);

    const dataRepo ={"admin_id":auth.user.id,"nomeCriador":auth.user.username}
    const repositorio = await Repositorio.create(dataRepo);

    const valoresPastaPai = {"nome":"pastaPai","repositorio_id":repositorio.id}
    await Pasta.create(valoresPastaPai);

    const dataHack = {"admin_id":auth.user.id,"nome":valores.nome,"nomeCriador":auth.user.username,"desc":valores.desc,"repositorio_id":repositorio.id,"documentacao_id":doc.id,"linguagem_hack_id":valores.linguagem,"grupo_hack_id":valores.grupo}
    const hack = await Hack.create(dataHack);

    const defaultDocTextos =["<h4>Versao do hack:</h4><h5><strong>  ....</strong></h5>",  "<h4>Programas Usados:</h4><h5><strong>...</strong></h5>", "<h4>Tipo do Hack:</h4><h5><strong>...</strong></h5>", "<h4>Plataforma Invadida:</h4><h5><strong>...</strong></h5>", "<h4>Como foi feito o hack:</h4><h5><strong>...</strong></h5>", "<h4>Créditos:</h4><h5><strong>...</strong></h5>"]
    const defaultDocNomes =["hack_versao","hack_programas","hack_tipo","hack_invasao","hack_realizacao","hack_creditos"]

    if(valores.tipo =="padrao"){
      let i = 0;
      for (let nome of defaultDocNomes) {
        let dataTopico = {"texto":defaultDocTextos[i],"documentacao_id":doc.id,"nome":nome}
        await Topico.create(dataTopico);
        i++;
      }
    }

    return hack;

  }


  async show ({ params, request, response, view }) {
    var item = await Hack.findOrFail(params.id);
    return item;
  }


  async edit ({ params, request, response, view }) {
  }


  async update ({ params, request, response }) {
  }


  async destroy ({ params, request, response }) {
  }
}

module.exports = HackController
