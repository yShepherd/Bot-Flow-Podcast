const Discord = require('discord.js');
const moment = require("moment");
const c = require('../config.json')

const status = {
    online: "Online",
    idle: "Ausente",
    dnd: "Ocupado",
    offline: "Offline/Invisivel"
};

exports.run = (client, message, args) => {
    var permissions = [];
    var acknowledgements = 'Nenhum';

    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    if (!member) return;
    const randomColor = "#000000".replace(/0/g, function () {
        return (~~(Math.random() * 16)).toString(16);
    });

    if (member.hasPermission("KICK_MEMBERS")) {
        permissions.push("Kick Members");
    }

    if (member.hasPermission("BAN_MEMBERS")) {
        permissions.push("Ban Members");
    }

    if (member.hasPermission("ADMINISTRATOR")) {
        permissions.push("Administrator");
    }

    if (member.hasPermission("MANAGE_MESSAGES")) {
        permissions.push("Manage Messages");
    }

    if (member.hasPermission("MANAGE_CHANNELS")) {
        permissions.push("Manage Channel's");
    }

    if (member.hasPermission("MENTION_EVERYONE")) {
        permissions.push("Mention everyone");
    }

    if (member.hasPermission("MANAGE_NICKNAMES")) {
        permissions.push("Manage nicknames");
    }

    if (member.hasPermission("MANAGE_ROLES")) {
        permissions.push("Manage channels");
    }

    if (member.hasPermission("MANAGE_WEBHOOKS")) {
        permissions.push("Manage Webhooks");
    }

    if (member.hasPermission("MANAGE_EMOJIS")) {
        permissions.push("Manage Emojis");
    }

    if (permissions.length == 0) {
        permissions.push("Nenhuma permissão encontrada");
    }

    if (`<@${member.user.id}>` == message.guild.owner) {
        acknowledgements = 'Criador desse servidor';
    }




        
            const embed = new Discord.MessageEmbed()
                .setDescription(`<@${member.user.id}>`)
                .setAuthor(`${member.user.tag}`, member.user.displayAvatarURL)
                .setColor(randomColor)
                .setFooter(`Executado por: ${message.author.tag}`)
                .setThumbnail(member.user.displayAvatarURL)
                .setTimestamp()
                .addField("Status:", `${status[member.user.presence.status]}`)
                .addField('Entrou em: ', `${moment(member.joinedAt).format("dddd, MMMM Do YYYY, HH:mm:ss")}`)
                .addField("Conta criada em: ", `${moment(member.user.createdAt).format("dddd, MMMM Do YYYY, HH:mm:ss")}`)
                .addField(`Cargos: [${member.roles.cache.filter(r => r.id !== message.guild.id).map(roles => `\`${roles.name}\``).length}]`, `${member.roles.cache.filter(r => r.id !== message.guild.id).map(roles => `<@&${roles.id }>`).join(" **|** ") || "Nenhum cargo"}`)


        

            message.channel.send({
                embed
            });

        }

exports.help = {
    name: 'userinfo',
    description: 'Verifica as informações de um usuário',
    usage: 'userinfo <NICK>',
    aliases: ['user']
};