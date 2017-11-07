const mongoose = require('mongoose');
const db = mongoose.connection;

const utils = require('../../libs/utils');

module.exports = {
    description: "Заменяет в модели карточки свойство userId на ownerIds",
    version: 2,
    applyChanges: async () => {
        const cardsCollection = db.collection('cards');
        const cards =  await cardsCollection.find({}).toArray();
        if (!cards) {
            return;
        }
        for (let card of cards) {
            card.ownerIds = [card.userId];
            delete card.userId;
            await cardsCollection.update({_id: card._id}, card);
        }
    }
}