const Discord = require('discord.js');
const superagent = require('superagent');

exports.run = async (client, message, args, tools) => {
    let supportEmbed = new Discord.MessageEmbed()
          .setColor("#32EDF7")
        .setTitle('About MCYT')
        .setDescription(`This is another Discord bot based off the Axios Discord Bot, made by ThunderRedStar and loosely based off [HarutoHiroki's Cryptonix X](https://github.com/HarutoHiroki/CryptonixX). This bot is meant for any MCYT fan.`)
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
    name: 'about',
    description: 'Gives some info about bot.',
    usage: 'about',
};