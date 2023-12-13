'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Repositorio extends Model {
  admin () {
    return this.belongsTo('App/Models/User')
  }
  pastas() {
    return this.hasMany("App/Models/Pasta");
  }
}

module.exports = Repositorio
