'use strict';

const ApplicationError = require('libs/application-error');

const DbModel = require('./common/dbModel');

class AutoPayments extends DbModel {
	constructor() {
		super('auto-payment');
	}

	// /**
	//  * Добавляет автоплатёж
	//  *
	//  * @param {Object} autoPayment описание автоплатежа
	//  * @returns {Promise.<Object>}
	//  */
	async create(autoPayment) {
		const isDataValid = autoPayment
			&& Object.prototype.hasOwnProperty.call(autoPayment, 'cardId')
			&& Object.prototype.hasOwnProperty.call(autoPayment, 'sum')
			&& Object.prototype.hasOwnProperty.call(autoPayment, 'date')
			&& Object.prototype.hasOwnProperty.call(autoPayment, 'receiverType')
			&& Object.prototype.hasOwnProperty.call(autoPayment, 'receiverNumber');

		if (isDataValid) {
			const newAutoPayment = Object.assign({}, autoPayment, {
				id: await this._generateId()
			});

			await this._insert(newAutoPayment);
			return newAutoPayment;
		}

		throw new ApplicationError('Auto-payment data is invalid', 400);
	}
}

module.exports = AutoPayments;
