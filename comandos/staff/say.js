const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {

  if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`${message.author}, você não possui permissão para executar esse comando.`)

  const sayMessage = args.join(' ');
  message.delete().catch(O_o => {});
  message.channel.send(sayMessage);
};

exports.help = {
  name: "say",
  aliases: ['falar']
}