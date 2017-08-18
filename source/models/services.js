'use strict';

const ApplicationError = require('libs/application-error');

const FileModel = require('./common/fileModel');

class Services extends FileModel {
	constructor () {
		super('services.json');
	}
}

module.exports = Services;
