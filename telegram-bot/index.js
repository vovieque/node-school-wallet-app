const Telegraf = require('telegraf');
const TelegrafFlow = require('telegraf-flow');
const mongoose = require('mongoose');
const config = require('config');
const UserModel = require('../source/models/users');
const CardModel = require('../source/models/cards');
const TransactionModel = require('../source/models/transactions');


mongoose.connect(config.get('mongo.uri'), {useMongoClient: true});
mongoose.Promise = global.Promise;

const Users = new UserModel();
const Cards = new CardModel();
const Transactions = new TransactionModel();
const {WizardScene} = TelegrafFlow;

const superWizard = new WizardScene(
'super-wizard',
	async (ctx) => {
    if (ctx.message) {
      const user = await Users.getBy({$or: [{"token": ctx.message.text}, {"chatId": ctx.chat.id}]});
      if (!user) {
        return ctx.replyWithMarkdown('You should send a token');
      }
      if (ctx.message.text === '/cards' || ctx.message.text === '/transactions') {
        ctx.flow.wizard.next();
      }
      await Users._update({id: user.id}, {chatId: ctx.chat.id});
      ctx.reply('/cards - посмотреть баланс на текущих картах \n/transactions - посмотреть транзакции по всем картам');
      ctx.flow.wizard.next();
    }
	}, async (ctx) => {
    if (ctx.message.text === '/cards') {
      const user = await Users.getBy({$or: [{"token": ctx.message.text}, {"chatId": ctx.chat.id}]});
      const userId = user.id;
      const cards = await Cards.getAll(userId);
  
      const options = {
        reply_markup: JSON.stringify({
          inline_keyboard: cards.map(card => [{text: `${card.cardNumber}`, callback_data: `card ${card.id}`}])
        })
      };
      ctx.reply('Посмотреть баланс карты:\n/exit- выйти', options);
      ctx.flow.wizard.next();
    }
    if (ctx.message.text === '/transactions') {
      const user = await Users.getBy({$or: [{"token": ctx.message.text}, {"chatId": ctx.chat.id}]});
      const userId = user.id;
      const transactions = await Transactions.getAll(userId);
      ctx.reply(transactions.map(transaction => {return {amout: transaction.sum, fromCard: transaction.data.cardNumber}}));
      ctx.reply('\n/exit- выйти')
      ctx.flow.wizard.next();
    }
    if (ctx.message.text !== '/cards' && ctx.message.text !== '/transactions') {
      ctx.replyWithMarkdown('111/cards - баланc\n/transactions - транзакции');
    }
  },
  async (ctx) => {
    if (ctx.callbackQuery && ctx.callbackQuery.data.split(' ')[0] === 'card'){
      const cardId = ctx.callbackQuery.data.split(' ')[1];
      const card = await Cards.get(cardId);
      ctx.reply(`Баланс выбранной карты: ${card.balance}р. Выйти: /exit`);
    }
    ctx.reply(`/start и начнем заново :)`);      
    ctx.flow.leave();
  }
);

const flow = new TelegrafFlow([superWizard], {defaultScene: 'super-wizard'});
const app = new Telegraf('353547522:AAHZKq89MfY6wCWlnDw-4eEgsjt3Wb1Uiqs');
app.use(Telegraf.session());
app.use(flow.middleware());
app.startPolling();