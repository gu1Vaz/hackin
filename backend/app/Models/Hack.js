'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Hack extends Model {
  admin () {
    return this.belongsTo('App/Models/User')
  }
  grupo () {
    return this.belongsTo('App/Models/GrupoHack')
  }
  linguagem () {
    return this.belongsTo('App/Models/LinguagemHack')
  }
}

module.exports = Hack
