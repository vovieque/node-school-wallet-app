const utils = require('../../../libs/utils');
const mongoose = require('mongoose');

const Card = mongoose.model('Card', {
	id: {
		type: Number,
		required: true
	},
	userId: {
		type: Number,
		required: true
	},
	cardNumber: {
		type: String,
		validate: {
			validator(value) {
				return utils.validateCardNumber(value);
			},
			message: '{VALUE} is not a valid card number!'
		},
		required: [true, 'Card number required']
	},
	balance: {
		type: Number,
		required: true
	}
});

module.exports = Card;
