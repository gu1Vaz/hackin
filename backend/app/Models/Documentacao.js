'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Documentacao extends Model {
  admin () {
    return this.belongsTo('App/Models/User')
  }
  topicos() {
    return this.hasMany("App/Models/Topico");
  }
}

module.exports = Documentacao
