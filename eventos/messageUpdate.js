const Discord = require('discord.js');
const c = require('../comandos/config.json');

exports.name = 'messageUpdate';
exports.run = (oldMessage, newMessage, message) => {
    if (["discord.gg/", "discordapp.com/invite/", "invite.gg/", "discord.io/", "discord.me/", "discord.plus/", "dis.gd/"].some(invite => message.content.includes(invite) && !message.content.includes("https://discord.gg/EhjgQ24"))) {
        message.delete().then(message.channel.send(`${message.author} You can't send another's Discord Server's!!!!!`).then(msg => msg.delete(8000)))
    }

    if (newMessage.channel.type === 'dm') return;
    if (oldMessage.content == newMessage.content) return;

    let logChannel = message.guild.channels.cache.get(c.logChannel);
    if (!logChannel) return;

    if (newMessage.author.bot) return;

    let embed = new Discord.MessageEmbed()
        .setAuthor(`${message.author.username}`, message.author.displayAvatarURL)
        .setDescription('📝 **<@' + message.author.id + '> Mensagem de texto editada**\n\n**Canal texto:** <#' + message.channel.id + '>\n\n**Mensagem antiga**: \n```' + newMessage.content + '```\n\n**Nova mensagem**: \n```' + message.content + '``` ')
        .setColor("RANDOM")
        .setTimestamp()
    logChannel.send(embed);
}