const utils = require('../../../libs/utils');
const mongoose = require('mongoose');
const AutoPayment = mongoose.model('AutoPayment', {
	id: {
		type: Number,
		required: true
	},
	cardId: {
		type: Number,
		required: true
	},
	sum: {
		type: Number,
		required: true
	},
	date: {
		type: Date,
		required: true,
		// validate: {
		// 	validator(value) {
		// 		return value > Date.now;
		// 	},
		// 	message: 'Invalid date!'
		// },
	},
	receiverType: {
		type: String,
		required: true
	},
	receiverNumber: {
		type: String,
		required: true
	},
	isDone: {
		type: Boolean,
		required: true
	}
});

module.exports = AutoPayment;
