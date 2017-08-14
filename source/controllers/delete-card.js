'use strict'

const fs = require('fs')
const path = require('path')

module.exports = (req, res) => {
	const cardId = Number(req.params['id'])

	if (!cardId) {
		return res.sendStatus(400)
	}

	const cards = require('../cards.json')
	const card = cards.find((item) => {
		return item.id === cardId
	})

	if (!card) {
		return res.sendStatus(404)
	}

	const cardIndex = cards.indexOf(card)
	cards.splice(cardIndex, 1)

	fs.writeFileSync(path.join(__dirname, '..', 'cards.json'), JSON.stringify(cards, null, 4))
	res.sendStatus(200)
}
