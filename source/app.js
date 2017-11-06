'use strict';

const fs = require('fs');
const http = require('http');
const https = require('https');
const path = require('path');
const Koa = require('koa');
const serve = require('koa-static');
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser')();
const logger = require('../libs/logger')('app');
const migrator = require('../libs/migrator');

const {renderToStaticMarkup} = require('react-dom/server');

const getCardsController = require('./controllers/cards/get-cards');
const createCardController = require('./controllers/cards/create');
const deleteCardController = require('./controllers/cards/delete');
const getTransactionController = require('./controllers/transactions/get');
const createTransactionsController = require('./controllers/transactions/create');
const cardToCard = require('./controllers/cards/card-to-card');
const cardToMobile = require('./controllers/cards/card-to-mobile');
const mobileToCard = require('./controllers/cards/mobile-to-card');

const errorController = require('./controllers/error');

const ApplicationError = require('../libs/application-error');
const CardsModel = require('./models/cards');
const TransactionsModel = require('./models/transactions');

const getTransactionsController = require('./controllers/transactions/get-transactions');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/school-wallet', { useMongoClient: true });
mongoose.Promise = global.Promise;

// IIFE here for using await
(async () => {
	await migrator();

	const app = new Koa();

	function getView(viewId) {
		const viewPath = path.resolve(__dirname, 'views', `${viewId}.server.js`);
		delete require.cache[require.resolve(viewPath)];
		return require(viewPath);
	}

	async function getData(ctx) {
		const user = ctx.state.user;
		const cards = await ctx.cardsModel.getByUserId(user.id);
		const transactions = await ctx.transactionsModel.getByCardIds(cards.map(c => c.id));

		return {
			user,
			cards,
			transactions
		};
	}

	// Сохраним параметр id в ctx.params.id
	router.param('id', (id, ctx, next) => next());

	router.get('/', async (ctx) => {
		if (!ctx.isAuthenticated()) {
			ctx.redirect('/login');
			return;
		}
		const data = await getData(ctx);
		const indexView = getView('index');
		const indexViewHtml = renderToStaticMarkup(indexView(data));

		ctx.body = indexViewHtml;
	});

	router.get('/cards/', getCardsController);
	router.post('/cards/', createCardController);
	router.delete('/cards/:id', deleteCardController);

	router.get('/cards/:id/transactions/', getTransactionController);
	router.post('/cards/:id/transactions/', createTransactionsController);

	router.post('/cards/:id/transfer', cardToCard);
	router.post('/cards/:id/pay', cardToMobile);
	router.post('/cards/:id/fill', mobileToCard);

	router.get('/transactions/', getTransactionsController);

	router.all('/error', errorController);
	const authController = require('./controllers/auth');
	router.use(authController.routes());

	// error handler
	app.use(async (ctx, next) => {
		try {
			await next();
		} catch (err) {
			logger.error('Error detected', err);
			ctx.status = err instanceof ApplicationError ? err.status : 500;
			ctx.body = `Error [${err.message}] :(`;
		}
	});

	app.use(bodyParser);

	// sessions
	const convert = require('koa-convert');
	const session = require('koa-session-store');
	const MongooseStore = require('koa-session-mongoose');

	app.keys = ['your-session-secret', 'another-session-secret'];
	app.use(convert(session({
	store: new MongooseStore()
	})));

	process.env.HOSTNAME = "https://127.0.0.1:3000";	
	// authentication
	require('../libs/auth');
	const passport = require('koa-passport');
	app.use(passport.initialize());
	app.use(passport.session());

	// logger
	app.use(async (ctx, next) => {
		const start = new Date();
		await next();
		const ms = new Date() - start;
		logger.info(`${ctx.method} ${ctx.url} - ${ms}ms`);
	});

	// Создадим модель Cards и Transactions на уровне приложения и проинициализируем ее
	app.use(async (ctx, next) => {
		ctx.cardsModel = new CardsModel();
		ctx.transactionsModel = new TransactionsModel();

		await next();
	});

	app.use(router.routes());
	app.use(serve('./public'));

	const listenCallback = function() {
		const {
			port
		} = this.address();

		logger.info(`Application started on ${port}`);
	};

	const LISTEN_PORT = 3000;

	if (!module.parent && process.env.NODE_HTTPS) {
		const protocolSecrets = {
			key: fs.readFileSync('fixtures/key.key'),
			cert: fs.readFileSync('fixtures/cert.crt')
		};

		https
			.createServer(protocolSecrets, app.callback())
			.listen(LISTEN_PORT, listenCallback);
	}

	if (!module.parent && !process.env.NODE_HTTPS) {
		http
			.createServer(app.callback())
			.listen(LISTEN_PORT, listenCallback);
	}

	module.exports = app;
})();

process.on('uncaughtException', (err) => {
	console.error(err);
	mongoose.disconnect();
});