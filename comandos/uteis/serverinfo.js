const Discord = require('discord.js')

const moment = require('moment')
moment.locale('pt-br')

module.exports = {

  run: function (client, message, args) {

    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    if (!member) return;
    const randomColor = "#000000".replace(/0/g, function () {
        return (~~(Math.random() * 16)).toString(16);
    });

    const date = message.guild.createdAt
    const joined = message.member.joinedAt

    const region = {
      brazil: ':flag_br: Brazil'
    }

    const embed = new Discord.MessageEmbed()
      .setColor(client.displayHexColor === '#000000' ? '#ffffff' : client.displayHexColor)
      // .setThumbnail(message.guild.iconURL)
      .setAuthor('🔍 • Server information')
      .addField('**:medal: • *Name**', message.guild.name, true)
      .addField('**💻 • ID**', message.guild.id, true)
      .addField('**👑 • Owner**', `${message.guild.owner.user.username}#${message.guild.owner.user.discriminator} | ${message.guild.owner.user.id}`)
      .addField('**🌎 • Region**', region[message.guild.region], true)
      .addField('**:boy: • Humans | 🤖 • Bots**', `${message.guild.members.cache.filter(member => !member.user.bot).size} | ${message.guild.members.cache.filter(member => member.user.bot).size}`)
      .addField('**💬 • Channels**', message.guild.channels.cache.size, true)
      .addField('**💬 • Roles**', message.guild.roles.cache.size, true)
      .addField('**📆 • Create in**', formatDate('DD/MM/YYYY, at HH:mm:ss', date))
      .addField('**🚀 • You joined in**', formatDate('DD/MM/YYYY, at HH:mm:ss', joined))
      .setFooter(`Run by: ${message.author.tag}`)
      .setTimestamp()
      .setThumbnail(member.user.avatarURL)

    // Aqui sera enviado o embed no canal que o usuário executo o comando
    message.channel.send(embed)
  },
  /**
     * Aqui podemos colocar mais algumas configurações do comando.
     */
  conf: {},

  /**
     * Aqui exportamos ajuda do comando como o seu nome categoria, descrição, etc...
     */
  get help () {
    return {
      name: 'serverinfo',
      category: 'Info',
      description: 'Informação sobre o servidor',
      usage: 'serverinfo'
    }
  }
}

/**
 * Formata a data passada para o padrão do Brasil.
 * @param {string} template
 * @param {Date=} [date]
 * @return {string}
 */
function formatDate (template, date) {
  var specs = 'YYYY:MM:DD:HH:mm:ss'.split(':')
  date = new Date(date || Date.now() - new Date().getTimezoneOffset() * 6e4)
  return date.toISOString().split(/[-:.TZ]/).reduce(function (template, item, i) {
    return template.split(specs[i]).join(item)
  }, template)
}