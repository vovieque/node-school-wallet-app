'use strict';

const ApplicationError = require('libs/application-error');

const FileModel = require('./common/fileModel');

class Transactions extends FileModel {
	constructor() {
		super('transactions.json');
	}

	/**
	 * Добавляет новую транзакцию
	 *
	 * @param {Object} transaction описание транзакции
	 * @returns {Promise.<Object>}
	 */
	async create(transaction) {
		const newTransaction = Object.assign({}, transaction, {
			id: this._generateId()
		});
		this._dataSource.push(newTransaction);
		await this._saveUpdates();
		return newTransaction;
	}

	/**
	 * Получает транзакции по идентификатору карты
	 * @param {Number} cardId Идентификатор карты
	 * @return {Promise.<Object[]>}
	 */
	async getByCard(cardId) {
		return this._dataSource.filter((transaction) => transaction.cardId === cardId);
	}

	/**
	 * Удаление транзакции
	 */
	static async remove() {
		throw new ApplicationError('Transaction can\'t be removed', 400);
	}
}

module.exports = Transactions;
