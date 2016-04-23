
module.exports = function(skill, info, bot, message) {
  console.log('INVOCATION OF NON-CONFIGURED SKILL: ' + skill);
  bot.reply(message, 'Rule 1 is No Stealing');
};
