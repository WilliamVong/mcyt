const Discord = require('discord.js');
const superagent = require('superagent');

exports.run = async (client, message, args, tools) => {
    let supportEmbed = new Discord.MessageEmbed()
          .setColor("#32EDF7")
        .setTitle('Vote for me')
        .setDescription(`[Top.gg](https://top.gg/bot/850092444871819314/vote)\n[DBL.com](https://discordbotlist.com/bots/mcyt/upvote)\n`)
        .setFooter("Thank you so much!")
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
    name: 'vote',
    description: 'Gives you an vote link. Voting really helps me.',
    usage: 'vote',
};