'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DocumentacaoSchema extends Schema {
  up () {
    this.create('documentacaos', (table) => {
      table.increments()
      table.integer('admin_id').unsigned().references('id').inTable('users')
                                            .onUpdate('CASCADE')
                                            .onDelete('CASCADE')
      table.timestamps()
    })
  }

  down () {
    this.drop('documentacaos')
  }
}

module.exports = DocumentacaoSchema
