const Discord = require('discord.js');
const superagent = require('superagent');

exports.run = async (client, message, args, tools) => {
    let supportEmbed = new Discord.MessageEmbed()
          .setColor("#32EDF7")
        .setTitle('Github repo')
        .setDescription(`[Click here](https://github.com/WilliamVong/mcyt)`)
        .setTimestamp()
    message.channel.send(supportEmbed)
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    cooldown: 5,
    perms: ["USE_EXTERNAL_EMOJIS", "ATTACH_FILES"],

    permLevel: 0
};

exports.help = {
    name: 'github',
    description: 'Returns the link to the github repo for this bot.',
    usage: 'github',
};