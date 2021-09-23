const Discord = require('discord.js');
const superagent = require('superagent');
const playerlist = require('../../assets/people.json')

function randomthing(array) {
    return array[Math.floor(Math.random() * array.length)]
}

exports.run = async (client, message, args, tools) => {
    let username = args[0]
    let sayContent = message.content.split(" ").slice(2).join(" ")
    if(playerlist[username] == undefined){
      return message.channel.send('Unfortunately we haven\'t found that person\'s Discord userid, please email `me@thunderredstar.tech` with the username and user id, if you have it. Thanks!');
    };
    let user = await client.users.fetch(playerlist[username])
    
    if(user.id == 1){return}
    message.channel.createWebhook(`${user.username}`, {
      avatar: `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=128`,
      reason: `pretend command`
    }).then((webhook) =>{
      webhook.send(sayContent, {
        username: user.username
      }).then(() =>{webhook.delete()});
      message.delete();
    });
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    cooldown: 5,
    premiumCooldown: 3,
    perms: ["USE_EXTERNAL_EMOJIS"],
    permLevel: 0
};

exports.help = {
    name: 'rp',
    description: 'Roleplay a MCYT user (as a webhook)',
    usage: 'rp <name> <message>',
};