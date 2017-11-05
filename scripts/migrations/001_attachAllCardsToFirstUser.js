const mongoose = require('mongoose');

const Card = require('../../source/models/db/card');
const User = require('../../source/models/db/user');
const utils = require('../../libs/utils');

module.exports = {
    description: "Добавялет в модель карточки свойство userId",
    version: 1,
    applyChanges: async () => {
        let user = await User.findOne({});
        if (!user) {
            user = await User.register({
                displayName: "Test User",
                email: "test.user@test"
            });
        }
        const userId = user.id;
        const cards = await Card.find({});
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
                    default:
                        console.log(card.cardNumber);
                        break;
                }
                await card.save();
            }
        }
    }
}