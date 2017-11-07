const utils = require('../../../libs/utils');
const mongoose = require('mongoose');

const CardSchema = new mongoose.Schema({
	id: {
		type: Number,
		required: true
	},
	cardNumber: {
		type: String,
		validate: {
			validator(value) {
				return utils.validateCardNumber(value)
					&& /^\d{16}$/.test(value)
					&& utils.getCardType(value) !== '';
			},
			message: '{VALUE} is not a valid card number!'
		},
		required: [true, 'Card number required'],
		unique: true
	},
	balance: {
		type: Number,
		required: true
	},
	ownerIds: {
		type: [Number],
		required: true
	}
});

CardSchema.pre('save', function(next) {
	this.cardNumber = this.cardNumber.replace(/\D/g, '');	
	next();
});

CardSchema.methods.addOwner = async function(userId) {
	if (!this.ownerIds.includes(userId)) {
		this.ownerIds.push(userId);
		await this.save();
	}
}

CardSchema.methods.removeOwner = async function(userId) {
	const index = this.ownerIds.indexOf(userId);
	if (index === -1) {
		throw new Error("CardSchema.methods.removeOwner: Пользователь не является владельцем этой карты");
	}
	this.ownerIds.splice(index, 1);
	if (!this.ownerIds || this.ownerIds.length === 0) {
		return await this.remove();
	}
	await this.save();
}

const Card = mongoose.model('Card', CardSchema);
module.exports = Card;
