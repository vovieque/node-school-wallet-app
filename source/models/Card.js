const FileModel = require('source/lib/FileModel')
const is_valid_by_luhn = require('source/lib/LuhnValidation')

class Card extends FileModel {

  static get _fileName () {
    return 'cards.json'
  }

  async is_valid () {

    // todo check if card has no existing transactions

    let { object } = this
    let { cardNumber } = object

    // todo create method before_validation

    if (cardNumber) {
      object.cardNumber = cardNumber.replace(/\D/g, '')
    }

    return  this.object.hasOwnProperty('cardNumber') &&
            this.object.hasOwnProperty('balance') &&
            await this.is_not_a_duplicate(object.cardNumber)
            is_valid_by_luhn(cardNumber)
  }

  async is_not_a_duplicate (cardNumber) {
    let cards = await this.constructor.all()
    return cards.filter((element) => element.cardNumber == cardNumber).length === 0
  }
}

module.exports = Card