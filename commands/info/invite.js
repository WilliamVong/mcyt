const Discord = require('discord.js');
const superagent = require('superagent');

exports.run = async (client, message, args, tools) => {
    let supportEmbed = new Discord.MessageEmbed()
          .setColor("#32EDF7")
        .setTitle('Invite me')
        .setDescription(`[Click here](https://discord.com/oauth2/authorize?client_id=850092444871819314&permissions=8&scope=bot)`)
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
    name: 'invite',
    description: 'Gives you an invite link.',
    usage: 'invite',
};