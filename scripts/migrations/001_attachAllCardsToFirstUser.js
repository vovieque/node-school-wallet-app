const mongoose = require('mongoose');
const db = mongoose.connection;

module.exports = {
    description: "Добавялет в модель карточки свойство userId",
    version: 1,
    applyChanges: async () => {
        const userCollection = db.collection('users');
        let user = await userCollection.findOne({});
        if (!user) {
            res = await userCollection.insert({
                id: 1,
                displayName: "Test User",
                email: "test.user@test"
            });
        }
        const userId = res.ops[0].id;
        const cardCollection = db.collection('cards');        
        const cards = await cardCollection.find({}).toArray();
        for (let card of cards) {
            if (!card.userId) {
                card.userId = userId;
                switch (card.cardNumber) {
                    case '546925000000000':
                        card.cardNumber = '5469250000000004';
                        break;
                    case '676230000000000':
                        card.cardNumber = '6762300000000009';
                        break;
                    case '405870000000000':
                        card.cardNumber = '4058700000000008';
                        break;
                    case '550064000000000':
                        card.cardNumber = '5500640000000007';
                        break;
                    case '437784000000000':
                        card.cardNumber = '4377840000000006';
                        break;
                    case '676803000000000':
                        card.cardNumber = '6768030000000006';
                        break;
                    default:
                        console.log(card.cardNumber);
                        break;
                }
                await cardCollection.update({_id: card._id}, card);
            }
        }
    }
}