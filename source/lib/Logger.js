const Logger = async (ctx, next) => {
  let start = new Date()
  await next()
  let time = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${time}ms`)
}

module.exports = Logger