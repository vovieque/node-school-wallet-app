'use strict';

const sinon = require('sinon');
const supertest = require('supertest');
const app = require('source/app.js');
const CardsModel = require('source/models/cards');

let sandbox = null;
beforeEach(() => { sandbox = sinon.sandbox.create(); });
afterEach(() => { sandbox.restore(); });

test('should create card successfull', async () => {
	sandbox.stub(CardsModel.prototype, 'loadFile').callsFake(function loadFile() {
		this._dataSource = [];
		return this._dataSource;
	});
	sandbox.stub(CardsModel.prototype, '_saveUpdates');
	const server = app.listen();
	const response = await supertest(server)
		.post('/cards/')
		.set('Accept', 'application/json')
		.send({cardNumber: '121212121212', balance: '1000'});
	server.close();
	expect(response.statusCode).toBe(201);
	expect(response.body).toEqual({
		cardNumber: '121212121212',
		balance: '1000',
		id: 1
	});
});
