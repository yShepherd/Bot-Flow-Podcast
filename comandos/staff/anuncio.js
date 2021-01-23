    const Discord = require('discord.js')
    const c = require('../config.json')
    exports.run = async (client, message, args) => {
        await message.delete()
        if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`${message.author}, você não possui permissão para executar esse comando.`).then(msg => msg.delete(8000))

        let mensg = args.join(' ')
        if (!mensg) {
            message.channel.send(`${message.author}, escreva alguma coisa para ser anúnciado. :mailbox_with_no_mail:`)
            return undefined;
        }

        const embed = new Discord.MessageEmbed()
            .setTitle('📢 • Flow Podcast - Anúncio')
            .setDescription(`${mensg}`)
           .setColor(c.cor)
            .setThumbnail(client.user.avatarURL)
            .setTimestamp()
            .setFooter(`Publicado por: ${message.author.username}`, message.author.avatarURL)
        client.channels.cache.get(c.newsChannel).send(embed)
    }

    exports.help = {
        name: "announce",
        aliases: [
            "announce",
            "anunciar"
        ]
    }