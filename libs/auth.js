const passport = require('koa-passport');

let tempUser = {
    id: 1
}

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    done(null, tempUser);
})

const GoogleStrategy = require('passport-google-auth').Strategy
passport.use(new GoogleStrategy({
        clientId: '82762493977-djirs9v01caeaj3ld7cfs27pqmftektr.apps.googleusercontent.com',
        clientSecret: 'vGSL7JxtdEn9I_7sMOqn2zxS',
        callbackURL: 'https://127.0.0.1:' + (process.env.PORT || 3000) + '/auth/google/callback'
    },
    function(token, tokenSecret, profile, done) {
        // retrieve user
        tempUser.fullName = profile.displayName;
        tempUser.imageUrl = profile.image.url;
        tempUser.googleId = profile.id;
        done(null, tempUser);
    }
));