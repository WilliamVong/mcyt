const Discord = require('discord.js'),
  settings = require('../config/settings.json');
  const Settings = require('../models/settings.js');
  const mongoose = require('mongoose');
  const fs = require('fs')
  
module.exports = guild => {
  let owner = guild.ownerID,
    channel = guild.channels.cache.get(guild.systemChannelID),
    joinEmbed = new Discord.MessageEmbed()
  .setTitle("MCYT")
  .setDescription(`Hello ${guild.name}, thanks for inviting me to this server! My default prefix is mc!, however, you can use the command ${settings.prefix}prefix to set a new prefix!`)
  channel.send(joinEmbed)
      let newData = new Settings({
      _id: mongoose.Types.ObjectId(),
      guildID: guild.id,
      prefix: "mc!",
    })
    fs.appendFileSync(`./logs/joinlog`, `[ ${(new Date).toString().split(" ").slice(1, 5).join(" ")} ] Joined server: ${guild.name} (${guild.id})\n`);
    newData.save();
    let blacklist = JSON.parse(fs.readFileSync("./blacklist.json", "utf8"));
    channel = guild.channels.cache.get(guild.systemChannelID)

      if (!blacklist[guild.ownerID]) return
      if(blacklist[guild.ownerID].state === true) {
        channel.send("But UNFORTUNATELY, the owner of this server has been blacklisted before so I'm LEAVING! Bye!")
        guild.leave(guild.id)
      }
    
}
