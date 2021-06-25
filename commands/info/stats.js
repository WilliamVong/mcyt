const Discord = require('discord.js')
const settings = require('../../settings.json');
const fs = require('fs');
const osutils = require('os-utils');
const version = require('../../package.json')
const Eris = require('eris')

exports.run = async (client, message, tools) => {
    let pbuild1 = Math.round(parseInt(osutils.totalmem() - osutils.freemem()).toString() / parseInt(`${osutils.totalmem().toString()}`) * 20)
    let pbuild2 = Math.round(parseInt(((process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)) / parseInt(`${osutils.totalmem().toString()}`)) * 20)
    let totalusers = 0
    let commandcollection = client.commands
    let totalcmds = commandcollection.array().length
    client.guilds.cache.array().forEach(guild => {
        totalusers += guild.memberCount
    })
    let totalchannels = await client.channels.cache.size
    let totalservers = await client.guilds.cache.size
    var milliseconds = parseInt((client.uptime % 1000) / 100),
        seconds = parseInt((client.uptime / 1000) % 60),
        minutes = parseInt((client.uptime / (1000 * 60)) % 60),
        hours = parseInt((client.uptime / (1000 * 60 * 60)) % 24);
    days = parseInt((client.uptime / (1000 * 60 * 60 * 24)) % 60);
    days = (days < 10) ? "0" + days : days;
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    fs.readdir('./commands/', async (err, files) => {
        if (err) console.error(err);
        totcmds = files.length;

        const prefixs = require("../../models/settings.js")
        prefixs.findOne({
            guildID: message.guild.id
        }, (err, srid) => {
            let globalprefix = settings.prefix || "mc!";
            osutils.cpuUsage(async function(v) {
                const embed = await new Discord.MessageEmbed()
          .setColor("#32EDF7")
                    .setTitle('Stats for MCYT')
                    .setThumbnail(client.user.avatarURL({ format: 'png', dynamic: true, size: 2048 }))
                    .setURL(client.user.avatarURL({ format: 'png', dynamic: true, size: 2048 }))
                    .setTimestamp()
                    .addField("About this server", "Prefix: `" + globalprefix + "`\nUsers in server: `" + message.guild.memberCount + "`\n", false)
                    .addField("About the platform", "Platform: `" + osutils.platform() + "`\nDeveloper: `" + "ThunderRedStar#9374" + "`\nFramework: `" + "Discord.js v12.5.3`")
                    .addField("About the bot", "Total Commands: `" + totalcmds + "`\nTotal Servers: `" + totalservers + "`\nTotal Channels: `" + totalchannels + "`\nTotal User Count: `" + totalusers + "`\nCached Users: `" + client.users.cache.size + "`")
                    .addField("Bot Resource Manager", "VPS Memory Used: ```" + `${(osutils.totalmem() - osutils.freemem()).toString().split(".")[0] + "." + (osutils.totalmem() - osutils.freemem()).toString().split(".")[1].split('')[0] + (osutils.totalmem() - osutils.freemem()).toString().split(".")[1].split('')[1]}MB/${osutils.totalmem().toString().split(".")[0] + "." + osutils.totalmem().toString().split(".")[1].split('')[0] + osutils.totalmem().toString().split(".")[1].split('')[1]}MB` + "\n[" + "=".repeat(pbuild1) + " ".repeat(20-pbuild1) + "]```" + "Bot Memory Used: ```" + `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}` + "MB/" /*osutils.totalmem().toString().split(".")[0] + "." + osutils.totalmem().toString().split(".")[1].split('')[0] + osutils.totalmem().toString().split(".")[1].split('')[1] + "MB"} `*/ + "52227.53MB\n[" + "=".repeat(pbuild2) + " ".repeat(20-pbuild2) + "]```")
                    /*.addField("Total Memory", osutils.totalmem().toString().split(".")[0] + "." + osutils.totalmem().toString().split(".")[1].split('')[0] + osutils.totalmem().toString().split(".")[1].split('')[1] + "MB", true)
                    .addField("RAM Usage Of VPS", `${(osutils.totalmem() - osutils.freemem()).toString().split(".")[0] + "." + (osutils.totalmem() - osutils.freemem()).toString().split(".")[1].split('')[0] + (osutils.totalmem() - osutils.freemem()).toString().split(".")[1].split('')[1]}/${osutils.totalmem().toString().split(".")[0] + "." + osutils.totalmem().toString().split(".")[1].split('')[0] + osutils.totalmem().toString().split(".")[1].split('')[1]}MB`, true)
                    .addField("RAM Usage Of Bot", (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2) + "MB/" + osutils.totalmem().toString().split(".")[0] + "." + osutils.totalmem().toString().split(".")[1].split('')[0] + osutils.totalmem().toString().split(".")[1].split('')[1] + "MB", true)
                    .addField("RAM Usage Of VPS %", `${(100 - osutils.freememPercentage() * 100).toString().split(".")[0] + "." + (100 - osutils.freememPercentage() * 100).toString().split(".")[1].split('')[0] + (100 - osutils.freememPercentage() * 100).toString().split(".")[1].split('')[1]}%`, true)
                    .addField("Ping", Math.round(client.ws.ping) + "ms", true)
                    .addField("Uptime", days + "d " + hours + "h " + minutes + "m " + seconds + "." + milliseconds + "s", true)*/
                    .setFooter(`MCYT`);
                message.channel.send({ embed });
            })
        })
    })
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    cooldown: 10,
    perms: ["USE_EXTERNAL_EMOJIS","ATTACH_FILES"],
    permLevel: 0
};

exports.help = {
    name: 'stats',
    description: 'Displays bot\'s stats.',
    usage: 'stats'
};
