'use strict'

const { await } = require("asyncawait");

const User = use('App/Models/User');
const Helpers = use('Helpers');
class UserController {

  async index ({ request, response, view }) {
  }


  async create ({ request, response, view }) {
  }
  async myUser({auth}) {
    await auth.getUser();
    const dados = User.findOrFail(auth.user.id);
    return dados;
  }


  async store ({ request, response }) {
  }


  async show ({ params }) {
    const dados = await User.query().select('id',  'username', 'created_at').where('id',params.id).fetch();
    return dados;
  }
  async edit ({ params, request, response, view }) {
  }


  async update ({ params,auth, request, response }) {
    await auth.getUser();
    const image =request.file("image")
    try{
      await image.move(Helpers.tmpPath('uploads/imgsPerfil/'+auth.user.id), {
        overwrite: true
      })
    }catch(e){

    }
    if (!image.move()) {
      return images.error()
    }

  }


  async destroy ({ params, request, response }) {
  }
}

module.exports = UserController
