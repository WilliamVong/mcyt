const Discord = require('discord.js');
const Axios = require('axios')
const Pagination = require('discord-paginationembed');

function randomthing(array) {
    return array[Math.floor(Math.random() * array.length)]
}

exports.run = async (client, message, args, tools) => {
    try {
        let inputid = args.join(" ")
        weeee = await message.channel.send("Awaiting response from AO3...")
        let work = await Axios.get("https://ao3api.williamvongphan.repl.co/search?query=" + inputid)
        if (work.data.response == []) {
            return message.channel.send("No search results for " + inputid + ".")
        }
        let arraything = work.data.response
        let embeds = [];
        arraything.forEach((arrayel) => {
            let embed = new Discord.MessageEmbed()
            .setTitle(arrayel.title)
            .setURL("https://archiveofourown.org/works/" + arrayel.id)
            .addField("Chapters", arrayel.chapters, true)
            .addField("Kudos", arrayel.kudos, true)
            .addField("Rating", arrayel.rating, true)
            .setFooter("ID: " + arrayel.id)                    
            .setColor("#32EDF7")
            embeds.push(embed)
        })
        new Pagination.Embeds()
            .setArray(embeds)
            .setAuthorizedUsers([message.author.id])
            .setChannel(message.channel)
            .setPageIndicator(true)
            .setPage(1)
            .setTimestamp()
            .build();
    } catch {
        return message.channel.send("No search results for " + inputid + ".")
    }
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
    name: 'search-fanfics',
    description: 'Searches for fanfics on AO3.',
    usage: 'search-fanfics <query>',
};