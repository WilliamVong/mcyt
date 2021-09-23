const Discord = require('discord.js'),
    superagent = require('superagent'),
    mongoose = require('mongoose'),
    User = require('../../models/user.js'),
    ms = require("ms")

exports.run = async (client, message, args, tools) => {
    data = await User.findOne({
        userID: message.author.id
    });
    if (!data) {
        let newData = new Settings({
            _id: mongoose.Types.ObjectId(),
            userID: message.author.id,
            premiumUntil: 0
        })
        newData.save();
        let embed = new Discord.MessageEmbed()
            .setTitle("Premium")
            .setDescription("You don't have premium, you can get premium by voting for the bot on Top.gg or by donating to me!\n\nPremium gives you access to faster cooldowns and special premium-only commands!")
            .setColor("#32EDF7")
            .setTimestamp()
            message.channel.send(embed)
    }
    else {
        if (Date.now() > data.premiumUntil) {
            let premiumstring
            if (data.premiumUntil == 0) {
                premiumstring = ""
            } else {
                console.log(Date.now() + " is ")
                console.log(data.premiumUntil)
                premiumstring = "Your premium expired **" + ms(Date.now() - data.premiumUntil, {long:true}) + "** ago."
            }
            let embed = new Discord.MessageEmbed()
                .setTitle("Premium")
                .setDescription("You don't have premium, you can get premium by voting for the bot on Top.gg or by donating to me!\n\nPremium gives you access to faster cooldowns and special premium-only commands!\n\n" + premiumstring)
                .setColor("#32EDF7")
                .setTimestamp()
                message.channel.send(embed)
        } else {
            let premiumstring
            if (data.premiumUntil == 0) {
                premiumstring = ""
            } else {
                premiumstring = "You have access to premium for **" + ms(data.premiumUntil-Date.now(), {long:true}) + "**."
            }
            let embed = new Discord.MessageEmbed()
                .setTitle("Premium")
                .setDescription(premiumstring)
                .setColor("#32EDF7")
                .setTimestamp()
                message.channel.send(embed)
        }
    }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    cooldown: 0,
    perms: ["USE_EXTERNAL_EMOJIS", "ATTACH_FILES"],
    permLevel: 0
};

exports.help = {
    name: 'checkpremium',
    description: 'Checks how much premium you have, if you have it.',
    usage: 'checkpremium',
};