'use strict';

class UserError extends Error {
	constructor(message, status = 400) {
		super(message);
		this._status = status;
		this._message = message;
	}

	/**
	 * Возвращает статус ошибки
	 * @returns {*}
	 */
	get status() {
		return this._status;
	}

	toString() {
		return this._message;
	}
}

module.exports = UserError;
