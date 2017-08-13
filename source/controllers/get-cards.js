'use strict'

module.exports = (req, res) => {
	const cards = require('../cards.json')
	res.json(cards)
}
