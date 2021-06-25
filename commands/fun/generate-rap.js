const Discord = require('discord.js');
const superagent = require('superagent');
const rapassets = require('../../assets/raps.json')

function randomthing(array) {
    return array[Math.floor(Math.random() * array.length)]
}

playerlist = ["Dream", "GeorgeNotFound"]
exports.run = async (client, message, args, tools) => {
    return message.channel.send("Hold on! We haven't finished this command yet!")
    let user = args[0]
    if (!args[0]) { return message.channel.send("You can't rap against nobody, try again.") }
    if (!playerlist.includes(user)) { return message.channel.send("Currently we don't have any individualized verses against that person, please check back later. ") }
    let genericrap = randomthing(rapassets["generic"])
    let playerrap = randomthing(rapassets[user])
    let embed = new Discord.MessageEmbed()
        .setColor("#32EDF7")
        .setTitle("Rap against " + user)
        .setDescription(genericrap + "\n" + playerrap)
        .addField("Format","Generic-Specific")
        .setFooter("We are constantly adding new raps against players! Feel free to suggest your own!")
    return message.channel.send(embed)
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    cooldown: 5,
    perms: ["USE_EXTERNAL_EMOJIS"],
    permLevel: 0
};

exports.help = {
    name: 'generate-rap',
    description: 'Generates a Jackbox Mad Verse City rap against a specific MCYT player.',
    usage: 'generate-rap <user>',
};