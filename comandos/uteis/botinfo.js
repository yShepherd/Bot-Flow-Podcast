const Discord = require('discord.js')
const c = require('../config.json')

const moment = require('moment')
moment.locale('pt-br')
exports.run = (client, message, args) => {

  let botAvatar = client.user.displayAvatarURL
  let date = client.user.createdAt
  let userName = client.user.username

  let totalSeconds = (client.uptime / 1000);
  let days = Math.floor(totalSeconds / 86400);
  let hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  let minutes = Math.floor(totalSeconds / 60);
  let seconds = totalSeconds % 60;

  let uptime = `${days} dias, ${hours} horas, ${minutes} minutos e ${seconds} segundos`;

  // Criando embed que sera enviado para o usuário
  let embed = new Discord.MessageEmbed()
    .setTitle('Informações do Bot')
    .setColor('RANDOM')
    .setThumbnail(botAvatar)
    .addField('Meu Desenvolvedor:', '<@565556135722221589>')
    .addField('Descrição:', "Olá, me chamo Flowerzito, e eu sou um simples bot Oficial do Flow Podcast, fui desenvolvido pelo Diego (yShepherd) para alegrar a comunidade do nosso DIscord, e ainda estou em desenvolvimento. Você viu algum bug no meu sistema ? Reporte para o <@565556135722221589>.")
    .addField('Nome do Bot:', userName)
    .addField('Estou online desde:', uptime)
    .addField('Fui criado em:', formatDate('DD/MM/YYYY, às HH:mm:ss', date))

  // Aqui sera enviado o embed no canal que o usuário executo o comando
  message.channel.send(embed)
}


function formatDate(template, date) {
  var specs = 'YYYY:MM:DD:HH:mm:ss'.split(':')
  date = new Date(date || Date.now() - new Date().getTimezoneOffset() * 6e4)
  return date.toISOString().split(/[-:.TZ]/).reduce(function (template, item, i) {
    return template.split(specs[i]).join(item)
  }, template)
}

exports.help = {
  name: 'botinfo',
  description: 'Informações do Bot:',
  usage: 'botinfo',
  aliases: ['bot']
}