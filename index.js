const Koa = require('koa');
const app = new Koa();
const serve = require('koa-static');
const router = require('koa-router')();

router.get('/', (ctx) => {
	ctx.body = `<!doctype html>
  <html>
    <head>
      <link rel="stylesheet" href="/style.css">
    </head>
    <body>
      <h1>Hello Smolny!</h1>
    </body>
  </html>`;
});

router.get('/error', () => {
	throw Error('Oops!');
});

const transferDataParams = (ctx, next) => {
	const {amount, from, to} = ctx.request.query;
	ctx.responseData = {
		amount,
		from,
		to
	};
	next();
};

router.get('/transfer', transferDataParams, (ctx) => {
		ctx.body = Object.assign({
			result: 'success'
		}, ctx.responseData);
	});

// error handler
app.use(async (ctx, next) => {
	try {
		await next();
	} catch (err) {
		console.log('Error detected', err);
		ctx.status = 500;
		ctx.body = `Error [${err.message}] :(`;
	}
});

// logger
app.use(async function(ctx, next) {
	const start = new Date();
	await next();
	const ms = new Date() - start;
	console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

app.use(router.routes());
app.use(serve('./public'));

app.listen(3000, () => {
	console.log('YM Node School App listening on port 3000!')
});

