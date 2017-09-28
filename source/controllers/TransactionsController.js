const Transaction = require('source/models/Transaction')

class TransactionsController {
  static async index (ctx) {
    ctx.body = await Transaction.where({cardId: ctx.params['card_id']})
  }

  static async create (ctx) {
    let transaction = new Transaction(ctx.request.body)
    if (await transaction.create()) {
      ctx.status = 201
      ctx.body = transaction.object
    } else {
      ctx.status = 400
      ctx.body = { status: 'not created' }
    }
  }
}

module.exports = TransactionsController