'use strict';

const fs = require('fs');
const path = require('path');

const Model = require('./model');

class FileModel extends Model {
	constructor(sourceFileName) {
		super();
		this._dataSourceFile = path.join(__dirname, '..', '..', 'data', sourceFileName);
		// eslint-disable-next-line global-require, import/no-dynamic-require
		this._dataSource = require(this._dataSourceFile);
	}

	async getAll() {
		return this._dataSource;
	}

	/**
	 * Сохраняет изменения
	 * @private
	 */
	async _saveUpdates() {
		return new Promise((resolve) =>
			fs.writeFile(this._dataSourceFile, JSON.stringify(this._dataSource, null, 4), resolve));
	}
}

module.exports = FileModel;
