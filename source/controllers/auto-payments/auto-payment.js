'use strict';

const commission = 3;

module.exports = async (ctx) => {
	const cardId = ctx.params.id;
	const payload = ctx.request.body;
	const {sum, date, receiverType, receiverNumber} = payload;

	const autoPayment = await ctx.autoPaymentModel.create({
		cardId: cardId,
		sum: parseInt(sum, 10) + commission,
		date: date,									// new Date().toISOString(),
		receiverType: receiverType,
		receiverNumber: receiverNumber,
		isDone: false
	});

	ctx.status = 200;
	ctx.body = autoPayment;
};
