'use strict';

const ApplicationError = require('libs/application-error');

const FileModel = require('./common/fileModel');

class Transactions extends FileModel {
    constructor () {
        super('transactions.json');
    }

    /**
     * Добавляет новую транзакцию
     *
     * @param {Object} transaction описание транзакции
     * @returns {Promise.<Object>}
     */
    async create(transaction) {
        this._dataSource.push(transaction);
        await this._saveUpdates();
        return transaction;
    }

    /**
     * Получает транзакцию по идентификатору карты
     * @param {Number} cardId Идентификатор карты
     * @return {Promise.<Object[]>}
     */
    async get(cardId) {
        return await this._dataSource.filter(transaction => transaction.cardId === cardId);
    }

    /**
     * Удалет транзакцию
     */
    async remove() {
        throw new ApplicationError(`Transaction can't be removed`, 400);
    }
}

module.exports = Transactions;
