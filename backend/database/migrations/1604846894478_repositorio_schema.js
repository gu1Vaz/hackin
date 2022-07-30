'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RepositorioSchema extends Schema {
  up () {
    this.create('repositorios', (table) => {
      table.increments()
      table.string('nomeCriador',25);
      table.integer('admin_id').unsigned().references('id').inTable('users')
                                            .onUpdate('CASCADE')
                                            .onDelete('CASCADE')
      table.string("file_url", 240).nullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('repositorios')
  }
}

module.exports = RepositorioSchema
