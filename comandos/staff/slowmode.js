const Discord = require('discord.js');
const { channel } = require('../../config');

exports.run = async (bot, message, args) => {
    if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(`Você não tem permissão para executar esse comando!`);
    message.channel.setRateLimitPerUser(args[0])
    message.reply(`modo lento alterado para: ${args[0]} segundos!`)
}

exports.help = {
    name: 'slowmode',
    aliases: ['slow']
}