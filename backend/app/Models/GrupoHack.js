'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class GrupoHack extends Model {
  hacks() {
    return this.hasMany("App/Models/Hack","id","grupo_hack_id");
  }
}

module.exports = GrupoHack
