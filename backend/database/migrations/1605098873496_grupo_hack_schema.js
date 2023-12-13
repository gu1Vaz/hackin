'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class GrupoHackSchema extends Schema {
  up () {
    this.create('grupo_hacks', (table) => {
      table.increments()
      table.string('nome', 34).notNullable().unique()
      table.timestamps()
    })
  }

  down () {
    this.drop('grupo_hacks')
  }
}

module.exports = GrupoHackSchema
