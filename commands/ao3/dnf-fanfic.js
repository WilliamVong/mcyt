const Discord = require('discord.js');
const Axios = require('axios')
const Pagination = require('discord-paginationembed');

function randomthing(array) {
    return array[Math.floor(Math.random() * array.length)]
}

exports.run = async (client, message, args, tools) => {
    weeee = await message.channel.send("Awaiting response from AO3...")
    let embeds = [];
    let kudos = await Axios.get("https://ao3api.williamvongphan.repl.co/search/?query=dreamnotfound")
    let randomwork = randomthing(works.data.response).id
    let work = await Axios.get("https://ao3api.williamvongphan.repl.co/load?id=" + randomwork)
    if (work.data.restricted == "true") {
        return message.channel.send("We accidentally pulled up a restricted work (which we can't read yet), please re-use this command to pull up a different work.")
    }
    if (work.data.rating == "Explicit" || work.data.rating == "Mature") {
        let warning = new Discord.MessageEmbed()
            .setTitle("Warning")
            .setColor("#FF0000")
            .setDescription("This work could possibly have adult content in it. If you do not want to see this content please press the 🗑 emoji below to delete the embed. Otherwise proceed with the ▶ button.")
        embeds.push(warning)
    }
    let page1 = new Discord.MessageEmbed()
        .setDescription(work.data.summary)
        .setColor("#32EDF7")
        .addField("Authors", work.data.authors.join(", ") || "No authors provided", true)
        .addField("Bookmarks", work.data.bookmarks, true)
        .addField("Categories", work.data.categories.join(", ") || "No categories provided", true)
        .addField("Chapter Count", work.data.chapters, true)
        .addField("Characters", work.data.characters.join(", ") || "No characters provided", true)
        .addField("Fandoms", work.data.fandoms.join(", ") || "No fandoms provided", true)
        .addField("Kudos", work.data.kudos, true)
        .addField("Published on", work.data.publishedon, true)
        .addField("Rating", work.data.rating, true)
        .addField("Relationships", work.data.relationships.join(", ") || "No relationships provided", true)
        .addField("Tags", work.data.tags.join(", ") || "No tags provided", true)
        .addField("Warnings", work.data.warnings.join(", ") || "No warnings provided", true)
        .addField("Word count", work.data.wordcount, true)
    embeds.push(page1)
    let content = [];
    if (work.data.chapters > 1) {
        let chapters = await Axios.get("https://ao3api.williamvongphan.repl.co/loadchapters?id=" + randomwork)
        chapters.data.chapters.forEach((chapter) => {
            content.push(chapter)
        })
    }
    else {
        content.push({ "text": work.data.text, "title": work.data.title, "number": 0 })
    }
    content.forEach(async (thing) => {
        for (x = 0; x < thing.text.length; x += 2000) {
            embeds.push(new Discord.MessageEmbed()
            .setAuthor("Chapter " + thing.number)
            .setDescription(thing.text.split("").slice(x, Math.min(x + 2000, thing.text.length)).join("") + "-")
            .setColor("#32EDF7"))
        }
    })
    new Pagination.Embeds()
        .setArray(embeds)
        .setAuthorizedUsers([message.author.id])
        .setChannel(message.channel)
        .setTitle(work.data.title)
        .setURL("https://archiveofourown.org/works/" + randomwork)
        .setPageIndicator(true)
        .setPage(1)
        .setTimestamp()
        .build();
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
    name: 'dnf-fanfic',
    description: 'Loads a random DNF fanfic from AO3. Some fanfics might not load because the bot is a guest (we\'re working on that)',
    usage: 'dnf-fanfic',
};