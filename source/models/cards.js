'use strict';

const ApplicationError = require('../../libs/application-error');
const UserError = require('../../libs/user-error');

const DbModel = require('./common/dbModel');

class Cards extends DbModel {
	constructor() {
		super('card');
	}

	/**
	 * Добавляет карту
	 *
	 * @param {Object} card описание карты
	 * @param {Numbrt} userId пользователь, которому надо доабвить эту карту
	 * @returns {Promise.<Object>}
	 */
	async create(card, userId) {
		const isDataValid = card
			&& Object.prototype.hasOwnProperty.call(card, 'cardNumber')
			&& Object.prototype.hasOwnProperty.call(card, 'balance');

		if (!isDataValid) {
			throw new ApplicationError('Card data is invalid', 400);
		}

		const existingCard = await this.getByCardNumber(card.cardNumber.replace(/\D/g, ''));
		if (!existingCard) {
			const newCard = Object.assign({}, card, {
				id: await this._generateId()
			});
			newCard.ownerIds =  [userId];
			try {
				return await this._insert(newCard);
			}
			catch(e) {
				console.log(e);
				throw new UserError("Неправильный номер карты");
			}
		}
		if (existingCard.ownerIds.includes(userId)) {
			throw new UserError("У вас уже есть такая карта");
		}
		await this.addOwner(existingCard.id, userId);
		delete existingCard.ownerIds; // Пользователю не нужно знать про всех владельцев карты
		return existingCard;

	}

	/**
	 * Удалет карту
	 * @param {Number} cardId Id карты
	 * @param {Number} userId Id пользователя, у которого надо эту карту отнять
	 */
	async remove(cardId, userId) {
		const card = await this.get(cardId);
		if (!card) {
			throw new ApplicationError(`Card with ID=${cardId} not found`);
		}
		const ownerIndex = card.ownerIds.indexOf(userId);
		if (ownerIndex === -1) {
			throw new ApplicationError(`This user is not an owner of card`);			
		}
		await this.removeOwner(card.id, userId);
		delete card.ownerIds; // Пользователю не нужно знать про всех владельцев карты
		return card;
	}

	/**
	 * Списание средств с карты
	 * @param {Number} id идентификатор карты
	 * @param {Number} sum сумма
	 */
	async withdraw(id, sum) {
		const card = await this.get(id);
		const newBalance = Number(card.balance) - Number(sum);

		await this._update({id}, {balance: newBalance});
	}

	/**
	 * Пополнение карты
	 * @param {Number} id идентификатор карты
	 * @param {Number} sum сумма
	 */
	async refill(id, sum) {
		const card = await this.get(id);
		const newBalance = Number(card.balance) + Number(sum);

		await this._update({id}, {balance: newBalance});
	}

	/**
	 * Получение всех карт пользователя
	 * @param {Number} userId Id пользователя
	 * @return {[{id: Number, cardNumber: string, balance: Number, userIds: [Number]}]} массив карточек
	 */
	async getByUserId(userId) {
		const data = await this._MongooseModel
		.find({ownerIds: userId})
		.lean()
		.exec();
		return data;
	}

	/**
	 * Получение карты по номеру карты
	 * @param {String} cardNumber Id пользователя
	 * @return {id: Number, cardNumber: string, balance: Number, userIds: [Number]} Карта с номером cardNumber
	 */
	async getByCardNumber(cardNumber) {
		const data = await this._MongooseModel.findOne({cardNumber});
		return data;
	}

	/**
	 * Добавление владельца карты
	 * @param {Number} cardId Id карты
	 * @param {Number} userId Id пользователя
	 */
	async addOwner(cardId, userId) {
		const card = await this._MongooseModel.findOne({id: cardId});
		await card.addOwner(userId);
	}

	/**
	 * Удаление владельца карты
	 * @param {Number} cardId Id карты
	 * @param {Number} userId Id пользователя
	 */
	async removeOwner(cardId, userId) {
		const card = await this._MongooseModel.findOne({id: cardId});
		await card.removeOwner(userId);
	}
}

module.exports = Cards;
