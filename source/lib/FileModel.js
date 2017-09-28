const fs = require('fs');
const path = require('path');
const Model = require('source/lib/Model')

class FileModel extends Model {

  constructor (params) {
    super()
    this._dataSource = []
    this.object = params
  }

  static get _fileName () {
    throw new Error('Method not implemented!')
  }

  static all () {
    return this._connect()
  }

  static async find (pkey) {
    const dataSource = await this._connect()
    const card = dataSource.find((item) => item.id == pkey);
    return new this(card)
  }

  // todo refactor
  static async where (conditions) {
    const dataSource = await this._connect()
    const result = []

    Object.keys(conditions).forEach((condition_key) => {
      dataSource.forEach((tx) => {
        if (tx[condition_key] == conditions[condition_key]) {
          result.push(tx)
        }
      })
    })

    return result
  }

  validate () {
    return true
  }

  async destroy () {
    this._dataSource = await this.constructor._connect()
    const index = this._dataSource.map((e) => e.id).indexOf(this.object.id)
    this._dataSource.splice(index, 1)
		await this._saveUpdates()
  }

  async create () {
    this._dataSource = await this.constructor._connect()

    if (await this.validate()) {
      this.object.id = this._dataSource.reduce((max, item) => Math.max(max, item.id), 0) + 1;
      this._dataSource.push(this.object);
      await this._saveUpdates();
      return true;
    } else {
      return false
    }
  }

  static _connect () {

    let data_source_file = path.join(__dirname, '..', 'db', this._fileName);

    return new Promise((resolve, reject) => {
      fs.readFile(data_source_file, (err, data) => {
        if (err) return reject(err)
        try {
          return resolve(JSON.parse(data))
        } catch (catched_err) {
          return reject(catched_err)
        }
      })
    })
  }

  async _saveUpdates() {
    let data_source_file = path.join(__dirname, '..', 'db', this.constructor._fileName);
		return new Promise(resolve =>
			fs.writeFile(data_source_file, JSON.stringify(this._dataSource, null, 4), resolve));
	}
}

module.exports = FileModel