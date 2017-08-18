'use strict';

const CardsModel = require('../models/cards');

module.exports = (req, res) => {
	const cardId = Number(req.params['id']);

	try {
		const cardsModel = new CardsModel();
		cardsModel.remove(cardId);
		res.sendStatus(200);
	} catch (err) {
		res.sendStatus(err.status);
	}
};
