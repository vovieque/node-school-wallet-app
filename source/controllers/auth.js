const router = require('koa-router')();
const passport = require('koa-passport');
const fs = require('fs');

router.get('/login', async (ctx) => {
	ctx.status = 200;
	ctx.res.setHeader('Content-Type', 'text/html');
	ctx.body = fs.createReadStream('./public/login.html');
});

router.post('/login',
	passport.authenticate('local', {
		successRedirect: '/',
		failureRedirect: '/login?error=NotAuth'
	})
);

router.get('/logout', async (ctx) => {
	ctx.logout();
	ctx.redirect('/');
});

router.get('/auth/google',
	passport.authenticate('google')
);

router.get('/auth/google/callback',
	passport.authenticate('google', {
		successRedirect: '/',
		failureRedirect: '/login?error=NotAuth'
	}),
	(ctx) => {
		ctx.redirect('/');
	}
);

module.exports = router;
