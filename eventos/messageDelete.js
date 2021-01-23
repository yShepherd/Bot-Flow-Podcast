  
const Discord = require('discord.js');
const c = require('../comandos/config.json');

exports.name = 'messageDelete';
exports.run = (client, message) => {
    if (message.channel.type === 'dm') return;

    let logChannel = message.guild.channels.cache.get(c.logChannel);
    if (!logChannel) return;

    if (message.author.bot) return;

    let embed = new Discord.MessageEmbed()
        .setAuthor(`${message.author.username}`, message.author.displayAvatarURL)
        .setDescription('📝 **Mensagem de texto deletada**\n\n**Canal de texto:** <#' + message.channel.id + '>\n\n**Mensagem**: \n```' + message.content + '```')
        .setColor("RANDOM")
        .setTimestamp()
    logChannel.send(embed);

}