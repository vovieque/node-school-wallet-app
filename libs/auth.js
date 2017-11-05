const passport = require('koa-passport');
const User = require('../source/models/db/user');

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	User.findOne({id}, (err, user) => {
		if (err) {
			done(err);
		}
		done(null, user);
	});
});

const GoogleStrategy = require('passport-google-auth').Strategy;

passport.use(new GoogleStrategy(
	{
		clientId: '82762493977-djirs9v01caeaj3ld7cfs27pqmftektr.apps.googleusercontent.com',
		clientSecret: 'vGSL7JxtdEn9I_7sMOqn2zxS',
		callbackURL: `${process.env.HOSTNAME}/auth/google/callback`
	},
	async (token, tokenSecret, profile, done) => {
		const user = await User.findOne({
			googleId: profile.id
		});
		if (!user) {
			const newUser = await User.register({
				displayName: profile.displayName || profile.emails[0].value,
				imageUrl: profile.image.url,
				googleId: profile.id,
				passwordHash: '#', // means password not set
				email: profile.emails[0].value,
				registerDate: Date.now()
			});
			done(null, newUser);
			return;
		}
		done(null, user);
	}
));
