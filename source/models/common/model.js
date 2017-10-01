'use strict';

class Model {
	/**
	 * Возвращает список всех объектов
	 * @returns {Promise.<void>}
	 */
	static async getAll() {} // eslint-disable-line no-empty-function

	/**
	 *
	 * @param {Number} id Идентификатор записи для поиска
	 * @returns {Promise.<void>}
	 */
	static async get(id) {} // eslint-disable-line no-unused-vars, no-empty-function

	/**
	 * Создание новой записи
	 * @returns {Promise.<void>}
	 */
	static async create() {} // eslint-disable-line no-empty-function

	/**
	 *
	 * @param {Number} id Идентификатор записи для удаления
	 * @returns {Promise.<void>}
	 */
	static async remove(id) {} // eslint-disable-line no-unused-vars, no-empty-function
}

module.exports = Model;
