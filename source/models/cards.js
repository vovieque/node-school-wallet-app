'use strict';

const ApplicationError = require('libs/application-error');

const FileModel = require('./common/fileModel');

class Cards extends FileModel {
	constructor() {
		super('cards.json');
	}

	/**
	 * Добавляет карту
	 *
	 * @param {Object} card описание карты
	 * @returns {Promise.<Object>}
	 */
	async create(card) {
		const isDataValid = card
			&& Object.prototype.hasOwnProperty.call(card, 'cardNumber')
			&& Object.prototype.hasOwnProperty.call(card, 'balance');

		if (isDataValid) {
			const newCard = Object.assign({}, card, {
				id: this._dataSource.length + 1
			});

			this._dataSource.push(newCard);
			await this._saveUpdates();
			return card;
		}

		throw new ApplicationError('Card data is invalid', 400);
	}

	/**
	 * Удалет карту
	 * @param {Number} id идентификатор карты
	 */
	async remove(id) {
		const card = this._dataSource.find((item) => item.id === id);

		if (!card) {
			throw new ApplicationError(`Card with ID=${id} not found`, 404);
		}
		const cardIndex = this._dataSource.indexOf(card);
		this._dataSource.splice(cardIndex, 1);
		await this._saveUpdates();
	}
}

module.exports = Cards;
