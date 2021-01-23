const Discord = require('discord.js'); //definindo conexão com discord padrão
const fs = require('fs'); //Definindo constante fs para inicialização de eventos
const client = new Discord.Client(); //definindo o bot como um novo client
const c = require('colors');
const fileUtils = require('./utils/fileUtils');


client.Database = require('./database.js');
client.Discord = require('discord.js');
config = require('./config');

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();      

/**
 * Initialize and start the bot.
 */
function start() {
    console.log(c.cyan('Carregando eventos...'));
    loadEvents('./eventos');

    console.log(c.cyan('Carregando comandos...'));
    loadCommands('./comandos');

    console.log(c.cyan('Conectando o bot...'));
    client.login(config.token);
}

/**
 * Load all commands in a specific directory.
 * 
 * @param {string} dir - The commands directory.
 */
function loadCommands(dir) {
    for (const dirInfo of fileUtils.searchByExtension(dir, 'js')) {
        const dirList = dirInfo.directory.split('/');
        dirList.shift();
        dirList.shift();
        const commandCategory = dirList
            .join('/');

        for (const file of dirInfo.files) {
            let cmd = require(file);
            if(!cmd.help) {
                // Invalid command.
                continue;
            }
    
            client.commands.set(cmd.help.name, cmd);
            if(cmd.help.aliases) {
                cmd.help.aliases
                .filter(alias => alias.trim() !== '')
                .forEach(alias => client.aliases.set(alias, cmd.help.name));
            }
        }

        const formatedFiles = dirInfo.files.map(file => file.split('/').pop().split('.').shift())
        console.log(`[COMANDO] ` + c.yellow('Foram carregados ') + dirInfo.files.length + c.yellow(' comandos na categoria ') + commandCategory + c.yellow('. [') + formatedFiles.join(c.yellow(', ')) + c.yellow(']'));
    }
}

/**
 * Load all events in a specific directory.
 * 
 * @param {string} dir - The events directory.
 */
function loadEvents(dir) {
    for (const dirInfo of fileUtils.searchByExtension(dir, 'js')) {
        for (const file of dirInfo.files) {
            let events = require(file);
            if(!Array.isArray(events)) {
                events = [events];
            }

            for (const event of events) {
                if(!event.name || !event.run) {
                    continue;
                }
    
                console.log(`[EVENTO] ` + c.yellow('O evento ') + event.name + c.yellow(' foi carregado!'));
    
                client.on(event.name, (...args) => event.run(client, ...args));

                
                        
                    }
                
            }
        }
    }


client.on("ready", () => {
    let activities = [
        `Utilize ${config.prefix}help para obter ajuda`,
        `${client.guilds.cache.size} servidores!`,
        `${client.channels.cache.size} canais!`,
        `${client.users.cache.size} usuários!`,
        `Desenvolvedor: yShepherd_ 🖤#4092`,
        `Apoie o flow e seja nosso membro em https://flowpodcast.com.br/membros`,
        `Acesse nossa loja em http://loja.flowpodcast.com.br/`,
        'Particie do nosso Discord Oficial com o link: https://discord.gg/Fuj5p4d'
      ],
      i = 5;
    setInterval( () => client.user.setActivity(`${activities[i++ % activities.length]}`, {
        name: 'Flow Podcast',
        type: "STREAMING",
        url: "https://www.twitch.tv/flowpodcast"
        }), 1000 * 10); 
    client.user
        .setStatus("dnd")
        .catch(console.error);
  console.log("Estou Online!")
  });

start();
