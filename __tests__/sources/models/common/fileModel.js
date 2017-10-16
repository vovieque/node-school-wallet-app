'use strict';

const fs = require('fs');
const path = require('path');
const sinon = require('sinon');
const FileModel = require('source/models/common/fileModel');

let sandbox = null;
beforeEach(() => { sandbox = sinon.sandbox.create(); });
afterEach(() => { sandbox.restore(); });

test('should load file successful', async () => {
	sandbox.stub(fs, 'readFile').callsFake((filePath, callback) => {
		expect(filePath).toBe(path.join(__dirname, '..', '..', '..', '..', 'source', 'data', 'cards.json'));
		callback(null, JSON.stringify({
			key: 'value'
		}));
	});

	const model = new FileModel('cards.json');
	const fileContent = await model.loadFile();
	expect(fileContent).toEqual({key: 'value'});
});

test('should throw error while parsing json', async () => {
	sandbox.stub(fs, 'readFile').callsFake((filePath, callback) => {
		callback(null, 'non json content');
	});
	const model = new FileModel('cards.json');
	try {
		await model.loadFile();
		fail('Should throw parsing error');
	} catch (err) {
		expect(err).not.toBeNull();
		expect(err.message).toBe('Unexpected token o in JSON at position 1');
	}
});

test('should return data from cache if it already loaded', async () => {
	sandbox.stub(fs, 'readFile').callsFake((filePath, callback) => {
		callback(null, JSON.stringify({
			key: 'value'
		}));
	});

	const model = new FileModel('cards.json');
	await model.loadFile();
	await model.loadFile();

	expect(fs.readFile.callCount).toBe(1);
});

test('should get all data successful', async () => {
	sandbox.stub(fs, 'readFile').callsFake((filePath, callback) => {
		callback(null, JSON.stringify({
			key: 'value'
		}));
	});

	const model = new FileModel('cards.json');
	expect(await model.getAll()).toEqual({
		key: 'value'
	});
});

test('should get data by id successful', async () => {
	sandbox.stub(fs, 'readFile').callsFake((filePath, callback) => {
		callback(null, JSON.stringify([
			{
				id: 1,
				key: 'value'
			}
		]));
	});

	const model = new FileModel('cards.json');
	await model.loadFile();
	expect(await model.get(1)).toEqual({
		id: 1,
		key: 'value'
	});
});

test('should get data by id with not loaded file', async () => {
	const model = new FileModel('cards.json');
	try {
		await model.get(1);
		fail('Error expected');
	} catch (err) {
		expect(err).not.toBeNull();
		expect(err.message).toBe('Data not loaded');
	}
});

test('should get data by not existing id', async () => {
	sandbox.stub(fs, 'readFile').callsFake((filePath, callback) => {
		callback(null, JSON.stringify([
			{
				id: 2,
				key: 'value'
			}
		]));
	});

	const model = new FileModel('cards.json');
	await model.loadFile();
	expect(await model.get(1)).toEqual(undefined);
});
