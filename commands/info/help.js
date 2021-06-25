const Discord = require("discord.js"),
  superagent = require("superagent"),
  fs = require("fs"),
  modules = [
"ao3",
  "fun",
  "images",
  "info",
  "owner",
  "players",
  "utility"
];

function permlevel(input) {
  if (input == 5)
    return "Can only be used by owner of bot";
  else if (input == 4)
    return "Can only be used by guild owner";
  else if (input == 3)
    return "Manage Guild";
  else if (input == 2)
    return "Ban Members";
  else if (input == 1)
    return "Manage Messages";
  else return "Anyone can use this command!";
}
exports.run = async (client, message, args, tools) => {
  if (!args[0]) {
    let categoryEmbed = new Discord.MessageEmbed()
      .setTitle("Categories of commands for MCYT")
      .setColor("#32EDF7")

      .setDescription(
        "\`ao3\`: All the stuff related to AO3!\n\`fun\`: Image Generators, Jackbox Generators, and more!\n\`images\`: Gets fanart for some of the MCYT fandoms.\n\`info\`: Information about the bot\n\`owner\`: For ThunderRedStar.\n\`players\`: Information about the main MC youtubers.\n\`utility\`: Useful things like stream checks.\n\nUse `mc!help <category>` to see the commands for that category!"
      )
      .setFooter("MCYT")
      .setTimestamp();
    message.channel.send(categoryEmbed);
  } else {
    if (modules.includes(args[0])) {
      fs.readdir(`commands/${args[0]}`, (err, files) => {
        let filesArray = [];
        if (err) console.error(err);
        let jsfiles = files.filter(f => f.split(".").pop() === "js");
        if (jsfiles.length <= 0) {
          message.channel.send(
            "There are no commands in the directory " + args[0] + " yet! Check back later. "
          );
          return;
        }

        jsfiles.forEach(f => {
          let props = require(`../../commands/${args[0]}/${f}`);
          filesArray.push(`\`${props.help.name}\`: ${props.help.description}`);
        });

        let commandslist = filesArray.join("\n"),
          listEmbed = new Discord.MessageEmbed()
          .setTitle(`Commands in directory \"${args[0]}\"`)
          .setColor("#32EDF7")

          .setDescription(commandslist + "\n\nUse `mc!help <command>` to see help for an individual command!")
          .setFooter("MCYT")
          .setTimestamp();

        message.channel.send(listEmbed);
      });
    } else {
      let command = args[0];
      if (client.commands.has(command)) {
        cmd = client.commands.get(command);
        let helpEmbed = new Discord.MessageEmbed()
          .setTitle(`Help for command ${cmd.help.name}`)
          .setColor("#32EDF7")
          .setDescription(
            `Name: \`${cmd.help.name}\`\nDescription: ${
              cmd.help.description
            }\nUsage: \`${cmd.help.usage}\`\nPermission Level: \`${cmd.conf.permLevel}\` (${permlevel(
              cmd.conf.permLevel
            )})\nRequired Bot Permissions: \`${cmd.conf.perms.join("`,`")}\``
          )
          .setFooter("MCYT")
          .setTimestamp();
        message.channel.send(helpEmbed);
      } else if (client.aliases.has(command)) {
        cmd = client.commands.get(client.aliases.get(command));
        cmd = client.commands.get(command);
        let helpEmbed = new Discord.MessageEmbed()
          .setTitle(`Help for command ${cmd.help.name}`)
          .setColor("#32EDF7")

          .setDescription(
            `Name: \`${cmd.help.name}\`\nDescription: ${
              cmd.help.description
            }\nUsage: \`${cmd.help.usage}\`\nPermission Level: \`${cmd.conf.permLevel}\` (${permlevel(
              cmd.conf.permLevel
            )})\nRequired Bot Permissions: \`${cmd.conf.perms.join("`,`")}\``
          )
          .setFooter("MCYT")
          .setTimestamp();
        message.channel.send(helpEmbed);
      } else {
        return message.reply("That command doesn't exist!");
      }
    }
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  cooldown: 5,
  perms: ["USE_EXTERNAL_EMOJIS","ATTACH_FILES"],
  permLevel: 0
};

exports.help = {
  name: "help",
  description:
    "Returns a list of categories of commands, a list of commands for a category, or help for a command itself.",
  usage: "help <command or category>",
};
