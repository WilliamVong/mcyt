const Discord = require('discord.js');
const superagent = require('superagent');
const playerlist = require('../../assets/people.json')

function randomthing(array) {
    return array[Math.floor(Math.random() * array.length)]
}

exports.run = async (client, message, args, tools) => {
    let people = Object.keys(playerlist)
    let embed = new Discord.MessageEmbed()
    .setTitle("List of people you can role-play")
    .setDescription(people.join("\n"))
    .setTimestamp()
    .setColor("#32EDF7")
    .setFooter("Please maintain capitalization when using these names!")
    return message.channel.send(embed)
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    cooldown: 5,
    premiumCooldown: 3,
    perms: ["USE_EXTERNAL_EMOJIS", "ATTACH_FILES"],
    permLevel: 0
};

exports.help = {
    name: 'rp-list',
    description: 'Lists the people you can role-play with this bot. ',
    usage: 'rp-list',
};