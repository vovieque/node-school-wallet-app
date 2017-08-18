'use strict';

class Model {

	/**
	 * Возвращает список всех объектов
	 * @return {Promise.<void>}
	 */
	async getAll() {}

	/**
	 *
	 * @param {Number} id Идентификатор записи для поиска
	 * @return {Promise.<void>}
	 */
	async get(id) {}

	/**
	 * Создание новой записи
	 * @return {Promise.<void>}
	 */
	async create() {}

	/**
	 *
	 * @param {Number} id Идентификатор записи для удаления
	 * @return {Promise.<void>}
	 */
	async remove(id) {}
}

module.exports = Model;