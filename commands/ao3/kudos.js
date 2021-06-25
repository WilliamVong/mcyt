const Discord = require('discord.js');
const Axios = require('axios')
const Pagination = require('discord-paginationembed');

function randomthing(array) {
    return array[Math.floor(Math.random() * array.length)]
}

exports.run = async (client, message, args, tools) => {
    try{
        let id = args[0]
        
        let kudos = await Axios.get("https://ao3api.williamvongphan.repl.co/kudos?id=" + id)
        let work = await Axios.get("https://ao3api.williamvongphan.repl.co/load?id=" + id)
        if (work.data.hasOwnProperty('error')) {
            return message.channel.send("Invalid work id!")
        }
        if (kudos.data.successful == false) {
            let response = new Discord.MessageEmbed()
            .setTitle("Kudos failed")
            .setDescription("You have already left a kudos on " + work.data.title + ".")
            .setColor("#FF0000")
            .setTimestamp()
        }    
        else {
            let response = new Discord.MessageEmbed()
            .setTitle("Kudos successful")
            .setDescription("The work " + work.data.title + " now has **" + kudos.data.newkudos + "**, up **1** from **" + oldkudos + "**")
            .setColor("#FFFF00")
            .setTimestamp()
        }
    }
    catch {
        return message.channel.send("Internal server error, please try again later")
    }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    cooldown: 60,
    perms: ["USE_EXTERNAL_EMOJIS", "ATTACH_FILES"],

    permLevel: 0
};

exports.help = {
    name: 'kudos',
    description: 'Leave kudos on a work by ID.',
    usage: 'kudos <id>',
};