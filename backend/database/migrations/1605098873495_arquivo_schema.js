'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ArquivoSchema extends Schema {
  up () {
    this.create('arquivos', (table) => {
      table.increments()
      table.string('nome',24)
      table.integer('pasta_id').unsigned().references('id').inTable('pastas')
                                       .onUpdate('CASCADE')
                                       .onDelete('CASCADE')
      table.text('codigo')
      table.timestamps()
    })
  }

  down () {
    this.drop('arquivos')
  }
}

module.exports = ArquivoSchema
