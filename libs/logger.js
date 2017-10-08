'use strict';

const path = require('path');
const log4js = require('log4js');

const filename = path.resolve(__dirname, '..', 'logs', 'app.log');
const config = {
	appenders: {
		out: {type: 'stdout'},
		app: {
			type: 'file',
			filename,
			maxLogSize: 10485760
		}
	},
	categories: {
		default: {
			appenders: ['out', 'app'],
			level: process.env.NODE_ENV === 'DEV' ? 'debug' : 'info'
		}
	}
};

log4js.configure(config);

module.exports = (category) => log4js.getLogger(category);
