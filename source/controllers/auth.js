const router = require('koa-router')();
const passport = require('koa-passport');

// POST /login
router.post('/login',
passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/logError.html'
})
);

router.get('/logout', function(ctx) {
ctx.logout();
ctx.redirect('/');
});

router.get('/auth/google',
passport.authenticate('google')
);

router.get('/auth/google/callback',
passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/logError.html'
}),
(ctx) => {
    ctx.redirect('/');   
}
);

module.exports = router;