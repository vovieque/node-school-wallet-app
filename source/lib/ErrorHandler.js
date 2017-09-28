ErrorHandler = async (ctx, next) => {
	try {
		await next();
	} catch (err) {
		console.log('Error detected', err);
		ctx.status = 500;
		ctx.body = `Error [${err.message}] :(`;
	}
}

module.exports = ErrorHandler