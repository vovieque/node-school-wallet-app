'use strict'

const fs = require('fs')
const path = require('path')

module.exports = (req, res) => {
	const card = req.body
	if (!card.hasOwnProperty('cardNumber') && !card.hasOwnProperty('balance')) {
		res.status(400)
		res.end()
	} else {
		const cards = require('../cards.json')
		card.id = cards.length + 1
		cards.push(card)
		fs.writeFileSync(path.join(__dirname, '..', 'cards.json'), JSON.stringify(cards, null, 4))
		res.status(201)
		res.json(card)
	}
}
