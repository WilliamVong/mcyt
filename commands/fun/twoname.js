const Discord = require('discord.js');
const superagent = require('superagent');

function twoname(name_input_1, name_input_2) {
    let name_1;
    let name_2;

    function length(item) {
        return item.length
    }

    if (length(name_input_1) > length(name_input_2)) {
        name_1 = name_input_2;
        name_2 = name_input_1;
    }
    if (length(name_input_1) < length(name_input_2)) {
        name_1 = name_input_1;
        name_2 = name_input_2;
    }
    else {
        name_1 = name_input_1;
        name_2 = name_input_2;
    }

    let array1 = name_1.split(/(?=[A-Z])/);
    let array2 = name_2.split(/(?=[A-Z])/);

    let array_1;
    let array_2;

    if (length(array1) > length(array2)) {
        array_1 = array2;
        array_2 = array1;
    }
    if (length(array1) < length(array2)) {
        array_1 = array1;
        array_2 = array2;
    }
    else {
        array_1 = array1;
        array_2 = array2;
    }

    let middle_index_1;
    let middle_index_2;

    if (length(array2) > 1) {
        let middle_index_1 = Math.floor(length(array1) / 2)
        if (middle_index_1 == 0) {
            middle_index_1 = 1
        }
        let middle_index_2 = Math.floor(length(array2) / 2)
        return array1.slice(0, middle_index_1).join("") + array2.slice(middle_index_2).join("")
    }
    else {
        let middle_index_1 = Math.floor(length(name_1) / 2)
        let middle_index_2 = Math.floor(length(name_2) / 2)
        return name_1.split("").slice(0, middle_index_1).join("") + name_2.split("").slice(middle_index_2).join("")
    }
}

exports.run = async (client, message, args, tools) => {
    let name1 = args[0]
    let name2 = args[1]
    if (!args[0]) {
        return message.channel.send("Please input a first name!")
    }    
    if (!args[1]) {
        return message.channel.send("Please input a second name!")
    }
    let supportEmbed = new Discord.MessageEmbed()
        .setColor("#32EDF7")
        .setTitle('Two names')
        .setDescription(name1 + " + " + name2 + " = **" + twoname(name1,name2) + "**")
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
    name: 'twoname',
    description: 'Combines two names together. Names must not contain spaces. Capitalization helps the combiner. Doesn\'t always work as intended.',
    usage: 'twoname',
};