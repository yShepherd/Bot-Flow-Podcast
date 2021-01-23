const config = require('../config');

let greetingChannel;

module.exports = [
    {
        name: "ready",
        run: (client) => {
            greetingChannel = client.channels.cache.get(config.channel.greeting);
        }
    }, {
        name: 'guildMemberAdd',
        run: (client, member) => {
            if (greetingChannel) {
                greetingChannel.send(`${member.user}, entrou no servidor, seja bem-vindo leia as nossas regras que está no canal <#>`);
            }
        }
    }, {
        name: 'guildMemberRemove',
        run: (client, member) => {
            if (greetingChannel) {
                greetingChannel.send(`${member.user}, usuário saiu do servidor... Espero que ele tenha gostado do servidor.`);
            }
        }
    }
];
