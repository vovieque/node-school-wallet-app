const Card = require('source/models/Card')

class CardsController {

  static async index (ctx) {
    ctx.body = await Card.all()
  }

  static async create (ctx) {
    let card = new Card(ctx.request.body)
    if (await card.create()) {
      ctx.status = 201
      ctx.body = card.object
    } else {
      ctx.status = 400
      ctx.body = { status: 'not created' }
    }
  }

  static async destroy (ctx) {
    let card = await Card.find(ctx.params['id'])
    if (card.object) {
      await card.destroy()
      ctx.status = 200
    } else {
      ctx.status = 404
      ctx.body = { status: 'not found' }
    }
  }

}

module.exports = CardsController