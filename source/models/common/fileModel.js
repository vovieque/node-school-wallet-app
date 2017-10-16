'use strict';

const fs = require('fs');
const path = require('path');

const logger = require('libs/logger')('file-model');
const Model = require('./model');
const ApplicationError = require('libs/application-error');

class FileModel extends Model {
	constructor(sourceFileName) {
		super();
		this._dataSourceFile = path.join(__dirname, '..', '..', 'data', sourceFileName);
		this._dataSource = null;
	}

	async loadFile() {
		if (!this._dataSource) {
			await new Promise((resolve, reject) => {
				fs.readFile(this._dataSourceFile, (err, data) => {
					if (err) {
						return reject(err);
					}

					try {
						this._dataSource = JSON.parse(data);
						return resolve();
					} catch (error) {
						return reject(error);
					}
				});
			});
		}
		return this._dataSource;
	}

	async getAll() {
		return this.loadFile();
	}

	async get(id) {
		if (this._dataSource === null) {
			throw new Error('Data not loaded');
		}
		return this._dataSource.find((item) => item.id === id);
	}

	/**
	 * Генерирует новый id для записи
	 * @return {Number}
	 * @private
	 */
	_generateId() {
		return this._dataSource.reduce((max, item) => Math.max(max, item.id), 0) + 1;
	}

	/**
	 * Сохраняет изменения
	 * @private
	 */
	async _saveUpdates() {
		return new Promise((resolve, reject) => {
			fs.writeFile(this._dataSourceFile, JSON.stringify(this._dataSource, null, 4), (err) => {
				if (err) {
					logger.error(`Save model ${this._dataSourceFile} error`, err);
					return reject(err);
				}
				return resolve();
			});
		}).catch(() => {
			throw new ApplicationError('Save model error', 500);
		});
	}
}

module.exports = FileModel;
