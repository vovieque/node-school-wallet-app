const passport = require('koa-passport');
const LocalStrategy = require('passport-local').Strategy;
const dbModelInit = require('./common/dbModel');
const ApplicationError = require('libs/application-error');

class passportHelper extends dbModelInit {
	constructor() {
		super('user');
	}

	/**
	 * Добавляет пользователя
	 *
	 * @param {Object} user описание пользователя
	 * @returns {Promise.<Object>}
	 */
	async create(user) {
		const newUser = Object.assign({}, user, {
			id: await this._generateId()
		});

		await this._insert(newUser);
		return newUser;
	}
}

const userModel = new passportHelper();

passport.use('login',
	new LocalStrategy(
		{
			usernameField: 'login',
			passwordField: 'password',
			passReqToCallback: true,
		},
		async function (req, login, password, done) {
			try {
				const user = await userModel.getBy(req.body);
				if (user)
					done(null, user);
				else
					done('User data is invalid', false);
			} catch (e) {
				done(e, false);
			}
		}
	)
);

passport.use('register',
	new LocalStrategy(
		{
			usernameField: 'login',
			passwordField: 'password',
			passReqToCallback: true,
		},
		async function (req, login, password, done) {
			try {
				const user = await userModel.create(req.body);
				if (user)
					done(null, user);
				else
					done('User data is invalid', false);
			} catch (e) {
				done(e, false);
			}
		}
	)
);

passport.serializeUser(async (user, done) => {
	done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
	try {
		const user = await userModel.get(id);
		done(null, user);
	} catch (e) {
		done(e, false);
	}
});
