'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Pasta extends Model {
  repositorio() {
    return this.belongsTo('App/Models/Repositorio')
  }
  arquivos() {
    return this.hasMany('App/Models/Arquivo')
  }
}

module.exports = Pasta
