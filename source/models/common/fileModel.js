'use strict';

const fs = require('fs');
const path = require('path');

const Model = require('./model');

class FileModel extends Model {
	constructor(sourceFileName) {
		super();
		this._dataSourceFile = path.join(__dirname, '..', '..', 'data', sourceFileName);
		this._dataSource = null;
	}

	async loadFile() {
		if(!this._dataSource) {
			await new Promise((resolve, reject) => {
				fs.readFile(this._dataSourceFile, (err, data) => {
					if(err) {
						return reject(err);
					}
					try {
						this._dataSource = JSON.parse(data);
						return resolve();
					} catch (err) {
						return reject(err);
					}
				})
			})
		}
		return this._dataSource;
	}

	async getAll() {
		return await this.loadFile();
	}

	/**
	 * Сохраняет изменения
	 * @private
	 */
	async _saveUpdates() {
		return new Promise(resolve =>
			fs.writeFile(this._dataSourceFile, JSON.stringify(this._dataSource, null, 4), resolve));
	}
}

module.exports = FileModel;
