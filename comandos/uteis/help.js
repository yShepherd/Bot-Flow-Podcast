const Discord = require('discord.js');
const c = require('../config.json')

module.exports.run = async (client, message, args) => {


    const embed = new Discord.MessageEmbed()
        .setAuthor(`${message.guild.name} - Ajuda`)
        .setDescription(`Para saber meus comandos, reage os emojis abaixo com a categoria correta.`)
        .addField(`⭐ **Informações**`, '• `ajuda`, `serverinfo`, `userinfo`, `botinfo`, `avatar`...')
        .addField(`🔧 **Staff**`, '• `kick`, `mute`, `chat`, `limpar`...')
        .setFooter(message.author.tag, message.author.avatarURL)
        .setTimestamp()
        .setColor('RANDOM')
    message.channel.send(embed).then(async msg => {
        await msg.react('⭐')
        await msg.react('🔧')
        await msg.react("↩")


        const informacao = (reaction, user) => reaction.emoji.name === '⭐' && user.id === message.author.id;
        const staff = (reaction, user) => reaction.emoji.name === '🔧' && user.id === message.author.id;
        const back = (reaction, user) => reaction.emoji.name === "↩" && user.id === message.author.id;

        const informacaoL = msg.createReactionCollector(informacao)
        const staffL = msg.createReactionCollector(staff)

        const backL = msg.createReactionCollector(back)


        backL.on('collect', r => {
            const embedd = new Discord.MessageEmbed()
            .setAuthor(`${message.guild.name} - Ajuda`)
            .setDescription(`Para saber meus comandos, reage os emojis abaixo com a categoria correta.`)
            .addField(`⭐ **Informations**`, '• `ajuda`, `serverinfo`, `userinfo`, `botinfo`, `avatar`...')
            .addField(`🔧 **Staff**`, '• `kick`, `mute`, `chat`, `limpar`...')
            .setFooter(message.author.tag, message.author.avatarURL)
            .setTimestamp()
            .setColor('RANDOM')
            msg.edit(embedd)
        })

        informacaoL.on('collect', r => {

            const embedinformacao = new Discord.MessageEmbed()
                .setAuthor(`${message.guild.name} - Help`)
                .setDescription(`⭐ **ÚTEIS**

                /ajuda - Mostra todos os meus comandos.
                /serverinfo - Mostra as informações desse servidor.
                /userinfo - Mostra o perfil com as informações do usuário.
                /botinfo - Mostra informações sobre mim.
                /avatar - Mostra o avatar (Icone) de um usuário.
                /ping - Shows the ping.
                /imgur \`<img>\` - Faz upload de uma imagem em Imgur.
                /tapa - Da um tapa em algum usuário.

         `)
                .setColor("RANDOM")
                .setFooter(message.author.tag, message.author.avatarURL)
                .setTimestamp()
            msg.edit(embedinformacao)
        })

      
    

    
         
        staffL.on('collect', r => {
            const embeddiversao = new Discord.MessageEmbed()
                .setAuthor(`${message.guild.name} - Help`)
                .setDescription(`🔧 **Staff**
                        
                /slowmode \`<tempo>\` - Seta o modo lento de um canal.
                /limpar \`<quantidade>\` - Exclui uma certa quantia de mensagens em um chat. (2 - 100)
                /embed \`<message>\` - Cria uma mensagem com embed.
                /announce \`<message>z\`- Manda um anúncio / anúncios será enviados no chat de anúncios.
                
 
        `)
                .setColor("RANDOM")
                .setFooter(message.author.tag, message.author.avatarURL)
                .setTimestamp()
            msg.edit(embeddiversao)
        })

    })
}

exports.help = {
    name: "ajuda",
    aliases: ['ajuda']
}