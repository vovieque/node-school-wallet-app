const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	id: {
		type: Number,
		required: true,
		unique: true
	},
	displayName: {
		type: String,
		required: true
	},
	passwordHash: {
		type: String,
		required: true,
		default: '#',
		validate: {
			validator(value) {
				return value !== '';
			},
			message: 'Password can not be an empty string!'
		},
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	registrationDate: {
		type: Date,
		default: Date.now
	},
	lastLoginDate: {
		type: Date,
		default: Date.now
	},
	imageUrl: String,
	googleId: String
});

UserSchema.statics.register = async function (userData) {
	userData.id = await this.getNextId();
	const user = new this(userData);
	const savedUser = await user.save();
	if (!savedUser) {
		throw new Error('UserSchema.statics.register. Не удалось добавить пользователя');
	}
	return savedUser;
};

UserSchema.statics.getNextId = async function () {
	const user = await this.findOne({}).sort({id : -1}).exec();
	if (!user) {
		return 1;
	}
	if (user.id >= Number.MAX_SAFE_INTEGER) {
		throw new Error('Unable to get next id. Max user id exceed');
	}
	return user.id + 1;
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
