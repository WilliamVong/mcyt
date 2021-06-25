const Discord = require('discord.js');
const Axios = require('axios');
const Youtube = require('simple-youtube-api');

const youtube = new Youtube(process.env.GOOGLE_API_KEY);

exports.run = async (client, message, args, tools) => {
    let channelsearchresults = await youtube.searchChannels(args.join(" "))
    let channelid = channelsearchresults[0].id
    let channelstats = await Axios.get("https://www.googleapis.com/youtube/v3/channels?part=statistics&id=" + channelid + "&key="+process.env.GOOGLE_API_KEY)
    let channelname = channelsearchresults[0].raw.snippet.title
    let channelsubs = channelstats.data.items[0].statistics.viewCount
    let stringthing;
    stringthing = "**" + channelsubs + "** views."
    let supportEmbed = new Discord.MessageEmbed()
        .setColor("#32EDF7")
        .setTitle(channelname + "'s youtube view count")
        .setDescription(stringthing)
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
    name: 'viewcount',
    description: 'Gets view count for anyone on Youtube.',
    usage: 'viewcount <user>',
};