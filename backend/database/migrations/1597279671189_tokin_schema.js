'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TokinsSchema extends Schema {
  up () {
    this.create('tokins', (table) => {
      table.increments()
      table.integer('fornecedor_id').unsigned().references('id').inTable('fornecedors')
      table.string('tokin', 255).notNullable().unique().index()
      table.string('type', 80).notNullable()
      table.boolean('is_revoked').defaultTo(false)
      table.timestamps()
    })
  }

  down () {
    this.drop('tokins')
  }
}

module.exports = TokinsSchema
