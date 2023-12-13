'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Item = use("App/Models/Item");
const Helpers = use('Helpers');
/**
 * Resourceful controller for interacting with items
 */
class ItemController {
  /**
   * Show a list of all items.
   * GET items
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const items = await Item.query()
    .orderBy('created_at','desc')
    .fetch();
    return items;
  }

  /**
   * Create/save a new item.
   * POST items
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const data = request.only(["nome","desc","preco"]);
    const image =request.file("image")
    await image.move(Helpers.tmpPath('uploads/codigos'), {
      overwrite: true
    })
    if (!image.move()) {
      return images.error()
    }
    const item = await Item.create(data);

    return item;
  }

  /**
   * Display a single item.
   * GET items/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    const item = await Item.findOrFail(params.id);
    return item;
  }

  /**
   * Update item details.
   * PUT or PATCH items/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const data = request.only(["nome","image_url","desc","preco"]);
    const item = await Item.findOrFail(params.id);
    item.image_url = data.image_url
    await item.save()
    return item;
  }

  /**
   * Delete a item with id.
   * DELETE items/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const item = await Item.findOrFail(params.id);
    await item.delete();
    return item;
  }
}

module.exports = ItemController
