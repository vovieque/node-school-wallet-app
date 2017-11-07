const utils = require('../../../libs/utils');
const mongoose = require('mongoose');
const crypto = require('crypto');
const uniqueValidator = require('mongoose-unique-validator');

const User = mongoose.model('User', {
	id: {
		type: Number,
		unique: true,
		required: [true, 'Id required']
	},
	chatId: {
		type: Number
	},
	name: {
		type: String,
		required: [true, 'Name required']
	},
	surname: {
		type: String,
		required: [true, 'Surname required']
	},
	login: {
		type: String,
		unique: true,
		required: [true, 'Login required']
	},
	token: {
		type: String,
		default: crypto.randomBytes(64).toString('hex')
	},
	password: {
		type: String,
		required: [true, 'Password required']
	},
	registered: {
		type: Date,
		default: Date.now
	}
});
User.schema.plugin(uniqueValidator, {message: ' must be unique'});

module.exports = User;
