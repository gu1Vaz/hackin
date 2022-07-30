'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class HackSchema extends Schema {
  up () {
    this.create('hacks', (table) => {
      table.increments()
      table.string('nome', 24).notNullable().unique()
      table.string('nomeCriador', 24).notNullable()
      table.string('desc',255).notNullable()
      
      table.integer('linguagem_hack_id').unsigned().references('id').inTable('linguagem_hacks')
                                       .onUpdate('CASCADE')
                                       .onDelete('CASCADE')
      table.integer('grupo_hack_id').unsigned().references('id').inTable('grupo_hacks')
                                       .onUpdate('CASCADE')
                                       .onDelete('CASCADE')
      table.integer('documentacao_id').unsigned().references('id').inTable('documentacaos')
                                       .onUpdate('CASCADE')
                                       .onDelete('CASCADE')
      table.integer('repositorio_id').unsigned().references('id').inTable('repositorios')
                                       .onUpdate('CASCADE')
                                       .onDelete('CASCADE')
      table.integer('admin_id').unsigned().references('id').inTable('users')
                                       .onUpdate('CASCADE')
                                       .onDelete('CASCADE')

      table.timestamps()
    })
  }

  down () {
    this.drop('hacks')
  }
}

module.exports = HackSchema
