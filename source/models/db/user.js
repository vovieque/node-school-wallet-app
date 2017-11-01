const utils = require('../../../libs/utils');
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const User = mongoose.model('User', {
	id: {
		type: Number,
		unique: true,
		required: [true, 'Id required']
	},
	name: {
		type: String,
		required: [true, 'Name required']
	},
	login: {
		type: String,
		unique: true,
		required: [true, 'Login required']
	},
	password: {
		type: String,
		validate: {
			validator(value) {
				return utils.validatePassword(value);
			},
			message: 'Password must have minimum eight and maximum 10 characters, at least one uppercase letter, one lowercase letter, one number and one special character!'
		},
		required: [true, 'Password required']
	},
	registered: {
		type: Date,
		default: Date.now
	}
});
User.schema.plugin(uniqueValidator, {message: ' must be unique'});

module.exports = User;
