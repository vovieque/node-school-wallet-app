const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const fs = require('fs')
const luhn = require('./libs/luhn')

app.use(express.static('public'));
app.use(bodyParser())

// CARDS

const get_cards = () => {
	let cardsBuffer = fs.readFileSync('./source/cards.json', 'utf8')
	return cardsBuffer ? JSON.parse(cardsBuffer) : []
}

const not_a_duplicate = (card) => {
	let cards = get_cards()
	return cards.filter((element) => element.cardNumber == card.cardNumber).length === 0
}

const validate = (card) => not_a_duplicate(card) && luhn(card.cardNumber)

app.get('/cards', (request, response) => {
	response.send(get_cards())
})

app.post('/cards', (request, response) => {

	try {

		let cards = get_cards()
		let { balance, cardNumber } = request.body

		let newCard = {
			cardNumber: cardNumber.replace(/\D/g, ''),
			balance: balance
		}

		if (balance && cardNumber && validate(newCard)) {
			let newCards = cards.concat(newCard)
			fs.writeFileSync('./source/cards.json', JSON.stringify(newCards))
			response.status(200).send({message: 'CARD ADDED'})
		} else {
			response.status(400).send({message: 'INVALID CARD DATA'})
		}
	} catch (error) {
		response.status(500).send({message: error.message})
	}

})

app.delete('/cards/:id', (request, response) => {

	try {

		let cards = get_cards()

		if (cards[request.params.id]) {
			cards.splice(request.params.id, 1)
			fs.writeFileSync('./source/cards.json', JSON.stringify(cards))
			response.status(200).send({message: 'CARD REMOVED'})
		} else {
			response.status(404).send({message: 'CARD NOT FOUND'})
		}
	} catch (error) {
		response.status(500).send({message: error.message})
	}

})

app.get('/', (req, res) => {
	res.send(`<!doctype html>
	<html>
		<head>
			<link rel="stylesheet" href="/style.css">
		</head>
		<body>
			<h1>Hello Smolny!</h1>
		</body>
	</html>`);
});

app.get('/error', (req, res) => {
	throw Error('Oops!');
});

app.get('/transfer', (req, res) => {
	const {amount, from, to} = req.query;
	res.json({
		result: 'success',
		amount,
		from,
		to
	});
});

app.listen(3000, () => {
	console.log('YM Node School App listening on port 3000!');
});
