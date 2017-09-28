const FileModel = require('source/lib/FileModel')

class Transaction extends FileModel {

  static get _fileName () {
    return 'transactions.json'
  }

  destroy () {
    throw new Error('Transactions can not be deleted!')
  }

  remove() {
    destroy()
  }
}

module.exports = Transaction