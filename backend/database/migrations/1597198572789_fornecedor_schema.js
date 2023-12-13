'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FornecedorSchema extends Schema {
  up () {
    this.create('fornecedors', (table) => {
      table.increments()
      table.string('username', 24).notNullable().unique()
      table.string('email', 254).notNullable().unique()
      table.string('password', 60).notNullable()
      
      table.timestamps()
    })
  }

  down () {
    this.drop('fornecedors')
  }
}

module.exports = FornecedorSchema