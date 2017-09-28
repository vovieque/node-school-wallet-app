const FileModel = require('source/lib/FileModel')
const luhn_validation = require('source/lib/LuhnValidation')

class Card extends FileModel {

  static get _fileName () {
    return 'cards.json'
  }

  async validate () {

    let { object } = this
    let { cardNumber } = object

    if (cardNumber) {
      object.cardNumber = cardNumber.replace(/\D/g, '')
    }

    return  this.object.hasOwnProperty('cardNumber') &&
            this.object.hasOwnProperty('balance') &&
            await this.not_a_duplicate(object.cardNumber)
            luhn_validation(cardNumber)
  }

  async not_a_duplicate (cardNumber) {
    let cards = await this.constructor.all()
    return cards.filter((element) => element.cardNumber == cardNumber).length === 0
  }
}

module.exports = Card