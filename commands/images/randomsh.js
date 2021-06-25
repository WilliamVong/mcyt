const Discord = require('discord.js');
const Axios = require('axios');

function randomthing(array) {
    return array[Math.floor(Math.random() * array.length)]
}

exports.run = async (client, message, args, tools) => {
    let re = new RegExp('(http[^\s]+(jpg|jpeg|png|tiff)\b)');
    const response = await Axios.get("http://api.tumblr.com/v2/tagged?tag=skephalo&api_key=" + process.env.tumblr)
    const thingy = randomthing(response.data.response)
    /*
    const tumblrEmbed = new Discord.MessageEmbed()
    .setAuthor(thingy.blog_name)
              .setColor("#32EDF7")

    .setTitle(thingy.title)
    .setURL(thingy.post_url)
    .setDescription(thingy.body)
    .setImage(re.exec(thingy.body))*/
    message.channel.send(thingy.short_url)
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    cooldown: 10,
    perms: ["USE_EXTERNAL_EMOJIS", "ATTACH_FILES"],
    permLevel: 0
};

exports.help = {
    name: 'randomsh',
    description: 'Fetches a random SkepHalo post on Tumblr.',
    usage: 'randomsh',
};