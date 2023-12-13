'use strict'

const Documentacao = use("App/Models/Documentacao");
const Topico = use("App/Models/Topico");
const {validateAll}= use('Validator') ;
class TopicoController {

  async index ({ params }) {
    const docum = await Documentacao.find(params.id)
    const topicos = await docum.topicos().fetch()
    return topicos;
  }


  async create ({ request, response, view }) {
  }


  async store ({ auth,request, response }) {
    const rules = {
      nome: 'required|max:24',
      texto: 'required'
    }
    const messages = {
      'nome.required':'De um nome ao novo Topico',
      'texto.required':'Insira o conteudo do topico',
      'nome.max':'Maximo de 24 caracters no nome'
    }
    const validation = await validateAll(request.all(), rules, messages)

    if (validation.fails()) {
      return response.status(400).send(validation.messages());
    }

    await auth.getUser()
    const valores = request.only(["nome","texto","documentacao_id"]);
    let texto = valores.texto.toLowerCase();
    const securityCode =["<script"]

    securityCode.forEach(code => {
      if(texto.includes(code)){
        return response.status(400).send(["Tag script detectada, remova <script/>"]);
      }
    });

    const documentacao = await Documentacao.findOrFail(valores.documentacao_id);

     if(auth.user.id == documentacao.admin_id){
        const data = {"texto":valores.texto,"documentacao_id":valores.documentacao_id,"nome":valores.nome}
        const topico = await Topico.create(data);
        return topico;
     }

  }


  async show ({ params, request, response, view }) {
    var item = await Topico.findOrFail(params.id);
    return item;
  }


  async edit ({ params, request, response, view }) {
  }


  async update ({auth, params, request, response }) {
    const rules = {
      nome: 'required|max:24',
      texto: 'required'
    }
    const messages = {
      'nome.required':'De um nome ao novo Topico',
      'texto.required':'Insira o conteudo do topico',
      'nome.max':'Maximo de 24 caracters no nome'
    }
    const validation = await validateAll(request.all(), rules, messages)

    if (validation.fails()) {
      return response.status(400).send(validation.messages());
    }

    await auth.getUser()

    const data = request.only(["nome","texto","documentacao_id"]);
    var item = await Topico.findOrFail(params.id);
    const documentacao = await Documentacao.findOrFail(data.documentacao_id);
    if(auth.user.id == documentacao.admin_id){
      item.nome = data.nome;
      item.texto = data.texto;
      await item.save()
      return item;
     }
  }


  async destroy ({ auth, params,response }) {
    await auth.getUser()
    const item = await Topico.findOrFail(params.id);
    const documentacao = await Documentacao.findOrFail(item.documentacao_id);
    if(auth.user.id == documentacao.admin_id){
      await item.delete();
      return item;
     }
  }
}

module.exports = TopicoController
