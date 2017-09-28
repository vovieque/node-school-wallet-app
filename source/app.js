// todo save method instead of create
// todo custom error classes

const Koa = require('koa')
const serve = require('koa-static')
const router = require('koa-router')()
const bodyParser = require('koa-bodyparser')()

const app = new Koa()

const logger = require('source/lib/Logger')
const error_handler = require('source/lib/ErrorHandler')
const CardsController = require('source/controllers/CardsController')
const TransactionsController = require('source/controllers/TransactionsController')

router.get('/cards', CardsController.index)
router.post('/cards', CardsController.create)
router.delete('/cards/:id', CardsController.destroy)

router.get('/cards/:card_id/transactions', TransactionsController.index)
router.post('/cards/:card_id/transactions', TransactionsController.create)

app
  .use(logger)
  .use(error_handler)
  .use(bodyParser)
  .use(router.routes())
  .use(serve('./public'))

app.listen(3001)