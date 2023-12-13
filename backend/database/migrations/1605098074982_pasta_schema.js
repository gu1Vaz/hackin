'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PastaSchema extends Schema {
  up () {
    this.create('pastas', (table) => {
      table.increments()
      table.string('nome',24)
      table.integer('repositorio_id').unsigned().references('id').inTable('repositorios')
                                       .onUpdate('CASCADE')
                                       .onDelete('CASCADE')

      table.timestamps()
    })
  }

  down () {
    this.drop('pastas')
  }
}

module.exports = PastaSchema
