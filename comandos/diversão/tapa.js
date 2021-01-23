const Discord = require('discord.js')
const superagent = require("superagent");

exports.run = async (bot, message, args) => {


    let User = message.guild.members.cache.get(args[0]) || message.mentions.members.first();
    if (!User) return message.channel.send("Menciona alguém para tomar um tapa.");
    if (User.id == message.author.id) return message.reply("Você não pode dar tapa em si mesmo, bobinho :D.")

    const {
        body
    } = await superagent
        .get(`https://nekos.life/api/v2/img/slap`);

    let Embed = new Discord.MessageEmbed()
        .setDescription(`<@${message.author.id}> deu um tapa em <@${User.id}>`)
        .setImage(body.url)
        .setColor("RANDOM")
        .setTimestamp()

    message.channel.send(Embed)
}

exports.help = {
    name: "tapa",
    aliases: ['slap']
}