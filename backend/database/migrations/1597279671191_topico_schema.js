'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')


class TopicoSchema extends Schema {
  up () {
    this.create('topicos', (table) => {
      table.increments()
      table.string('nome', 24)
      table.integer('documentacao_id').unsigned().references('id').inTable('documentacaos')
                                      .onUpdate('CASCADE')
                                      .onDelete('CASCADE')
      table.text('texto')
      table.timestamps()
    })
  }

  down () {
    this.drop('topicos')
  }
}

module.exports = TopicoSchema
