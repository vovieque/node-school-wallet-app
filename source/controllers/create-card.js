'use strict';

const CardsModel = require('../models/cards');

module.exports = (req, res) => {
	const card = req.body;
	try {
		const cardsModel = new CardsModel();
		const newCard = cardsModel.create(card);
		res.status(201).json(newCard);
	} catch (err) {
		res.sendStatus(err.status);
	}
};
