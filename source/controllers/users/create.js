'use strict';

const passport = require('koa-passport');
const ApplicationError = require('libs/application-error');

module.exports = async (ctx, next) => {
	await passport.authenticate('register', async function (err, user) {
		if (err) {
			throw new ApplicationError(err, 400);
		}
		ctx.body = {success: true};
		return ctx.login(user)
	})(ctx);
	await next();
};
