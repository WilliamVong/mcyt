const Discord = require("discord.js");
const fs = require('fs');
const settings = require('../../settings.json')

exports.run = async (client, message, args) => {
    let blacklist = JSON.parse(fs.readFileSync("./blacklist.json", "utf8"));
    let user = args[0];
    if(message.author.id !== settings.ownerid) return message.channel.send(`You don't have permission to use that command!`);
    //if (user = "blacklist") return message.reply('You need to imput a User ID');
    if (!user) return message.reply('You need to input a User ID.');
    
    if (!blacklist[user]) {
        message.reply("That user has not been blacklisted");
        return;
    };
    
    if (blacklist[user].state === false) {
        message.reply("That user has not been blacklisted");
        return;
    };

    if (blacklist[user].state === true) {
        blacklist[user] = {
            state: false
        }
    message.reply("That user has been removed from blacklist");
    fs.writeFile("./blacklist.json", JSON.stringify(blacklist), err => {
        if(err) throw err;
        return;
    });
    }
    
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    perms: ["USE_EXTERNAL_EMOJIS","ATTACH_FILES"],
    permLevel: 5
  };
  
exports.help = {
    name: 'unblacklist',
    description: 'un-blacklist a user.',
    usage: 'unblacklist [userid]'
};