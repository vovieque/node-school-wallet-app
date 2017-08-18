'use strict';

const ServicesModel = require('source/models/services');

module.exports = async (ctx) => {
	ctx.body = await new ServicesModel().getAll();
};
