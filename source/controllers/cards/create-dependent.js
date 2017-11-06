'use strict';

module.exports = async (ctx) => {
    const user = await ctx.usersModel.getBy({"login": ctx.request.body.login});
    const userId = user.id;
    const card = {
        userId: userId,
        cardNumber: ctx.request.body.cardNumber,
        balance: ctx.request.body.balance,
        parentId: Number(ctx.params.id)
    };
    const newCard = await ctx.cardsModel.create(card);
    /**
     * Тут ставится автоплатеж
     */
    ctx.status = 201;
    ctx.body = newCard;
};
