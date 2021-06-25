const Discord = require('discord.js');
const Axios = require('axios');
const Youtube = require('simple-youtube-api');

const youtube = new Youtube(process.env.GOOGLE_API_KEY);

exports.run = async (client, message, args, tools) => {
    let channelsearchresults = await youtube.searchChannels(args.join(" "))
    let channelid = channelsearchresults[0].id
    let channelstats = await Axios.get("https://www.googleapis.com/youtube/v3/channels?part=statistics&id=" + channelid + "&key="+process.env.GOOGLE_API_KEY)
    let channelname = channelsearchresults[0].raw.snippet.title
    let channeldescription = channelsearchresults[0].raw.snippet.description
    let channelsubs = channelstats.data.items[0].statistics.subscriberCount
    let channelviews = channelstats.data.items[0].statistics.viewCount
    let channelvideos = channelstats.data.items[0].statistics.videoCount
    let country = channelsearchresults[0].raw.snippet.country
    let thumbnail = channelsearchresults[0].raw.snippet.thumbnails.high.url
    let stringthing;
    if (country == undefined) {
        country = "Unknown country (Youtube didn't feel like giving it to us)"
    }
    if (channelsubs >= 1000) {
        stringthing = "Approximately **" + channelsubs + "** subscribers."
    }
    else {
        stringthing = "**" + channelsubs + "** subscribers."
    }
    let supportEmbed = new Discord.MessageEmbed()
        .setColor("#32EDF7")
        .setTitle(channelname)
        .setDescription(channeldescription)
        .setURL("https://youtube.com/channel/" + channelid)
        .setThumbnail(thumbnail)
        .addField("Subscriber Count", stringthing, true)
        .addField("View Count", "**" + channelviews + "** views.",true)
        .addField("Video Count", "**" + channelvideos + "** videos.",true)
        .addField("Channel country", country,true)
        .addField("Channel ID", channelid ,true)
        .setTimestamp()
    message.channel.send(supportEmbed)
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    cooldown: 15,
    perms: ["USE_EXTERNAL_EMOJIS", "ATTACH_FILES"],

    permLevel: 0
};

exports.help = {
    name: 'channeldata',
    description: 'Gets a bunch of channel data for anyone on Youtube.',
    usage: 'channeldata <user>',
};