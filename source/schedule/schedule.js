const schedule = require('node-schedule');

const AutoPaymentModel = require('../models/auto-payments');
const CardsModel = require('../models/cards');
const TransactionModel = require('../models/transactions');

// const autoPaymentModel = new AutoPaymentModel();
// const autoPaymentModel = new CardsModel();
// const autoPaymentModel = new TransactionModel();

schedule.scheduleJob('0 * * * * *', () => {
	scheduleAutoPaymentJob();
});

schedule.scheduleJob('10 * * * * *', () => {
	scheduleAutoPaymentJob();
});

schedule.scheduleJob('20 * * * * *', () => {
	scheduleAutoPaymentJob();
});

schedule.scheduleJob('30 * * * * *', () => {
	scheduleAutoPaymentJob();
});

schedule.scheduleJob('40 * * * * *', () => {
	scheduleAutoPaymentJob();
});

schedule.scheduleJob('50 * * * * *', () => {
	scheduleAutoPaymentJob();
});

function scheduleAutoPaymentJob() {
	// { '$where': 'this.created_on.toJSON().slice(0, 10) == "2012-07-14"' }
	const today = new Date();
	const condition = {
		'date': {
			// "$gte": new Date(today.getYear(), today.getMonth(), today.getDay() - 1),
			"$lt": new Date(today.getYear(), today.getMonth(), today.getDay() + 1)
		}
	};

	new AutoPaymentModel().getMany(condition)
		.then(async function (result) {
			console.log('search result: ' + result);
			result.forEach(async (autoPayment) => {
				await new CardsModel().withdraw(autoPayment.cardId, autoPayment.sum)
					.then(async () => {
						if (autoPayment.receiverType === 'card') {
							await new TransactionModel()
								.create({
									cardId: autoPayment.cardId,
									type: 'withdrawCard',
									data: {
										cardNumber: autoPayment.receiverNumber
									},
									time: new Date().toISOString(),
									sum: autoPayment.sum
								})
								.then(async () => {
									await setAutoPaymentDone(autoPayment);
								});
						} else if (autoPayment.receiverType === 'card') {
							await new TransactionModel()
								.create({
									cardId: autoPayment.cardId,
									type: 'withdrawCard',
									data: {
										phoneNumber: autoPayment.receiverNumber
									},
									time: new Date().toISOString(),
									sum: autoPayment.sum
								})
								.then(async () => {
									await setAutoPaymentDone(autoPayment);
								});
						} else {
							console.error('AutoPayment Error')
						}
					})
			})
		});
	console.log('schedule!');
}

async function setAutoPaymentDone(autoPayment) {
	await new AutoPaymentModel()._update({
		id: autoPayment.id
	}, {
		$set: {
			isDone: true
		}
	})
}
