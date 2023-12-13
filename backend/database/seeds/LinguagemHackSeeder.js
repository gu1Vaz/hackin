'use strict'



const Factory = use('Factory')
const LinguagemHack = use('App/Models/LinguagemHack')

class LinguagemHackSeeder {
  async run () {
    await LinguagemHack.createMany([
      {
        nome: 'Outros'
      },
      {
        nome: 'HTML'
      },
      {
        nome: 'Javascript',
      },
      {
        nome: 'PHP',
      },
      {
        nome: 'SQL',
      },
      {
        nome: 'C',
      },
      {
        nome: 'C++',
      },
      {
        nome: 'C#',
      },
      {
        nome: 'Perl',
      },
      {
        nome: 'Python',
      }
      ,
      {
        nome: 'Java',
      }
      ,
      {
        nome: 'Ruby',
      }
    ])
  }
}

module.exports = LinguagemHackSeeder
