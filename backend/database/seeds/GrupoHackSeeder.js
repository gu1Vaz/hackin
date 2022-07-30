'use strict'

/*
|--------------------------------------------------------------------------
| GrupoHackSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const GrupoHack = use('App/Models/GrupoHack')

class GrupoHackSeeder {
  async run () {
    await GrupoHack.createMany([
      {
        nome: 'MySql Injection'
      },
      {
        nome: 'BackDoor'
      },
      {
        nome: 'XSS',
      },
      {
        nome: 'DDOS',
      },
      {
        nome: 'Shell Injection',
      },
      {
        nome: 'Reverse Shell',
      },
      {
        nome: 'Shell',
      },
      {
        nome: 'Crack',
      },
      {
        nome: 'SSH',
      },
      {
        nome: 'Trojan',
      }
      ,
      {
        nome: 'Outros',
      }
    ])
  }
}

module.exports = GrupoHackSeeder
