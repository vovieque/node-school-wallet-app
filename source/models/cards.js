'use strict';

const fs = require('fs');
const path = require('path');

const ApplicationError = require('../../libs/application-error');

const DATA_SOURCE = path.join(__dirname, '..', 'cards.json');

class Cards {
	constructor () {
		this._dataSource = require(DATA_SOURCE);
	}

	/**
	 * Возвращает все карты
	 * @returns {Object[]}
	 */
	getAll () {
		return this._dataSource;
	}

	/**
	 * Добавляет карту
	 *
	 * @param {Object} card описание карты
	 * @returns {Object}
	 */
	create (card) {
		const isDataValid = card && card.hasOwnProperty('cardNumber') && card.hasOwnProperty('balance');
		if (isDataValid) {
			card.id = this._dataSource.length + 1;
			this._dataSource.push(card);
			this._saveUpdates();
			return card;
		} else {
			throw new ApplicationError('Card data is invalid', 400);
		}
	}

	/**
	 * Удалет карту
	 * @param {Number} id идентификатор карты
	 */
	remove (id) {
		const card = this._dataSource.find((item) => {
			return item.id === id;
		});

		if (!card) {
			throw new ApplicationError(`Card with ID=${id} not found`, 404);
		}
		const cardIndex = this._dataSource.indexOf(card);
		this._dataSource.splice(cardIndex, 1);
		this._saveUpdates();
	}

	/**
	 * Сохраняет изменения
	 * @private
	 */
	_saveUpdates () {
		fs.writeFileSync(DATA_SOURCE, JSON.stringify(this._dataSource, null, 4));
	}
}

module.exports = Cards;
