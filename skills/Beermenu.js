
module.exports = function(skill, info, bot, message) {
  console.log(message);
  console.log('INVOCATION OF NON-CONFIGURED SKILL: ' + skill);
  bot.reply(message, 'Cider is £1.50\nLager is £1.50\nRed Wine is £2.00 per glass\nWhite Wine is £2.00 per glass\nBeer is £1.50\n\n\nTo Add an order type something like "@beerbot Order me lager, add red wine, etc"');
};
