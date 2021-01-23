const Discord = require('discord.js')

module.exports.run = async (client, message, args) => {
    if(!message.member.hasPermission('KICK_MEMBERS')) return message.reply("Você não tem  "**Permissão**" para usar esse comando!")
    let member = message.mentions.members.first()
    if(!member)
      return message.reply("Por favor mencione alguém para ser punido.")
    if(!member.kickable)
      return message.reply("Eu não posso kickar esse membro, talvez o meu cargo seja menor do que o dele..")
    let reason = args.slice(1).join(' ')
    if(!reason) reason = "Nenhuma motivo inserida."
    await member.kick(reason)
      .catch(error => message.reply(`Desculpe ${message.author}, eu estou desabilitado para punir esse usuário. Motivo: ${error}`))

      message.channel.send(`<a:sucess1:792525094441582642> | ${message.author}, usuário punido! Ninguém mandou quebrar as regras!`)

      let pEmbed = new Discord.MessageEmbed()
          .setTitle(":hammer: Kick")
          .addField("Usuário kickado:", `${member.user.tag}`)
          .addField("Kickado por:", `${message.author.tag}`)
          .addField("Motivo:", `${reason}`)
          .setFooter(`${message.author.tag}`, message.author.displayAvatarURL)
          .setColor("DARK_RED").setTimestamp()

          message.guild.channels.cache.get(`788157097723559936`).send(pEmbed);
          
}

module.exports.help = {
    name: "kick"
}