const FileModel = require('source/lib/FileModel')

class Transaction extends FileModel {

  // todo before create set card id from query

  static get _fileName () {
    return 'transactions.json'
  }

  is_valid () {
    // todo check if card exists
    return  this.object.hasOwnProperty('cardId') &&
            this.object.hasOwnProperty('data') &&
            this.object.hasOwnProperty('sum')
  }

  destroy () {
    throw new Error('Transactions can not be deleted!')
  }

  remove () {
    destroy()
  }
}

module.exports = Transaction