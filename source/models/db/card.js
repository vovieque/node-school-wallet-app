const mongoose = require('mongoose');
const Card = mongoose.model('Card', {
  id: Number,
  cardNumber: String,
  balance: Number
});

module.exports = Card;
