'use strict';

const fs = require('fs')
const path = require('path')

module.exports = (req, res) => {
	const cardId = Number(req.params['id'])

	if (!cardId) {
		res.status(400)
		return res.end()
	}

	const cards = require('../cards.json')
	const card = cards.find((item) => {
		return item.id === cardId
	})

	if (!card) {
		res.status(404)
		return res.end()
	}

	const cardIndex = cards.indexOf(card)
	cards.splice(cardIndex, 1)

	fs.writeFileSync(path.join(__dirname, '..', 'cards.json'), JSON.stringify(cards, null, 4))
	res.status(200)
	res.end()
}
