'use strict';

const ApplicationError = require('libs/application-error');

const DbModel = require('./common/dbModel');

class Users extends DbModel {
	constructor() {
		super('user');
	}

	/**
	 * Добавляет пользователя
	 *
	 * @param {Object} user описание пользователя
	 * @returns {Promise.<Object>}
	 */
	async create(user) {
		const isDataValid = user
			&& Object.prototype.hasOwnProperty.call(user, 'name')
			&& Object.prototype.hasOwnProperty.call(user, 'login')
			&& Object.prototype.hasOwnProperty.call(user, 'password');

		if (isDataValid) {
			const newUser = Object.assign({}, user, {
				id: await this._generateId()
			});

			await this._insert(newUser);
			return newUser;
		}

		throw new ApplicationError('User data is invalid', 400);
	}

	/**
	 * Ищет пользователя по логину и паролю
	 *
	 * @param {String} login логин пользователя
	 * @param {String} password пароль пользователя
	 * @returns {Promise.<Object>}
	 */
	async getUser(login, password) {
		return await this.getBy({
			login,
			password
		});
	}
}

module.exports = Users;
