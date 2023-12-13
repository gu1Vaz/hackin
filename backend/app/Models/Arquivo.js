'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Arquivo extends Model {
  pasta () {
    return this.belongsTo('App/Models/Pasta')
  }
}

module.exports = Arquivo
