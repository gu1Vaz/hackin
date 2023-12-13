'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class LinguagemHackSchema extends Schema {
  up () {
    this.create('linguagem_hacks', (table) => {
      table.increments()
      table.string('nome', 34).notNullable().unique()
      table.timestamps()
    })
  }

  down () {
    this.drop('linguagem_hacks')
  }
}

module.exports = LinguagemHackSchema
