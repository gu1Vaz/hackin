'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Topico extends Model {
  documentacao () {
    return this.hasOne('App/Models/Documentacao')
  }
}

module.exports = Topico
