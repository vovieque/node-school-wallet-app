'use strict';

class Model {

	/**
	 * Возвращает список всех объектов
	 * @returns {Promise.<void>}
	 */
	async getAll() {}

	/**
	 *
	 * @param {Number} id Идентификатор записи для поиска
	 * @returns {Promise.<void>}
	 */
	async get(id) {}

	/**
	 * Создание новой записи
	 * @returns {Promise.<void>}
	 */
	async create() {}

	/**
	 *
	 * @param {Number} id Идентификатор записи для удаления
	 * @returns {Promise.<void>}
	 */
	async remove(id) {}
}

module.exports = Model;