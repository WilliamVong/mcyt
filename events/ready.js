const chalk = require('chalk');
const fs = require('fs')
module.exports = client => {
  client.user.setActivity(`Minecraft ► ${client.guilds.cache.size} servers ► mc!help`, { type: 'COMPETING' })
  let totalusers
  let dayssince
  setInterval(() => {
      totalusers = 0;
      client.guilds.cache.array().forEach(guild => {
        totalusers += guild.memberCount
    })
    dayssince = Math.round((Date.now() - 1624561470341) / 1000 / 60 / 60 / 24)
    client.user.setActivity(`Minecraft ► ${client.guilds.cache.size} servers ► ${totalusers} users ► mc!help`, { type: 'COMPETING' })
  },10000);
  console.log(chalk.green(`${client.guilds.cache.size} servers. `));
  let blacklist = JSON.parse(fs.readFileSync("./blacklist.json", "utf8"));
      fs.appendFileSync(`./logs/connectionlog`, `[ ${(new Date).toString().split(" ").slice(1, 5).join(" ")} ] Bot connected\n`);
  client.guilds.cache.forEach((guild) => {
    if (!blacklist[guild.ownerID]) {
      return;
    }else{
        channel = guild.channels.cache.get(guild.systemChannelID || channelID)
      if(blacklist[guild.ownerID].state === true) {
        channel.send("The guild owner is blacklisted, so bye!")
        guild.leave(guild.id)
      }
    }
  })
  
};
