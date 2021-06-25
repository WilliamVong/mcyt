const Discord = require('discord.js');
const Axios = require('axios')
const Twitch = require('node-twitch')

exports.run = async (client, message, args, tools) => {
    return message.channel.send("Psst! Coming soon (after 2FA is enabled, lol)")
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    cooldown: 30,
    perms: ["USE_EXTERNAL_EMOJIS", "ATTACH_FILES"],

    permLevel: 0
};

exports.help = {
    name: 'streams',
    description: 'Checks for MCYT Streams on twitch.',
    usage: 'streams',
};