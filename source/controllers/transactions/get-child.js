'use strict';

module.exports = async (ctx) => {
    const cardId = Number(ctx.params.id);
    const dependentCards = await ctx.cardsModel.getDependent(cardId);
    ctx.body = await ctx.transactionsModel.getMany({"cardId": {"$in": dependentCards}});
};
