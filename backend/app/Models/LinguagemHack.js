'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class LinguagemHack extends Model {
  hacks() {
    return this.hasMany("App/Models/Hack","id","linguagem_hack_id");
  }
}

module.exports = LinguagemHack
