'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')

class Fornecedor extends Model {
  static boot () {
    super.boot()
    
    this.addHook('beforeSave', async (userInstance) => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password)
      }
    })
  }


  tokins () {
    return this.hasMany('App/Models/Tokin')
  }

}

module.exports = Fornecedor
