'use strict';

const logger = require('libs/logger')('db-model');
const Model = require('./model');
const ApplicationError = require('libs/application-error');

class DbModel extends Model {
	constructor(dbModelName) {
		super();
		const MongooseModel = require(`../db/${dbModelName}`);
		this._MongooseModel = MongooseModel;
	}

	async getAll(id) {
		const data = await this._MongooseModel
			.find({userId: id})
			.lean()
			.exec();
		return data;
	}

	async get(id) {
		const data = await this._MongooseModel
			.findOne({id})
			.lean()
			.exec();
		return data;
	}

	async getBy(cond) {
		const data = await this._MongooseModel
			.findOne(cond)
			.lean()
			.exec();
		return data;
	}

	/**
	 * Генерирует новый id для записи
	 * @return {Number}
	 * @private
	 */
	async _generateId() {
		const data = await this._MongooseModel
			.find({})
			.sort({id: -1})
			.limit(1)
			.lean()
			.exec();
		return data.length > 0 ? data[0].id + 1 : 0;
	}

	async _insert(item) {
		await this._MongooseModel
			.create(item);
	}

	async _remove(id) {
		await this._MongooseModel
			.remove({id});
	}

	async _update(cond, set) {
		await this._MongooseModel
			.update(cond, {$set: set});
	}
}

module.exports = DbModel;
