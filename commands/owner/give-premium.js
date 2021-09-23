const ms = require("ms")
const Discord = require("discord.js");
const fs = require('fs');
const settings = require('../../config/settings.json')
const mongoose = require("mongoose")
User = require('../../models/user.js')
exports.run = async (client, message, args) => {
    user_id = args[0]
    amount = ms(args.slice(1).join(" "))
    await User.findOne({
        userID: user_id
    }, (err, user) => {
        if (!user) {
            let newpremium = new User({
                _id: mongoose.Types.ObjectId(),
                userID: user_id,
                premiumUntil: Date.now() + amount
            })
            newpremium.save()
        } else {
            let currentPremium = parseInt(user.premiumUntil)

            if (currentPremium < Date.now()) {
                newPremium = Date.now() + amount
            } else {
                newPremium = currentPremium + amount
            }
            user.premiumUntil = newPremium;
            user.save()
        }
    });
    let user = await client.users.fetch(user_id)
    message.channel.send(user.tag + " was given " + ms(amount, { long: true })   + " of premium.")

}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    perms: ["USE_EXTERNAL_EMOJIS", "ATTACH_FILES"],
    permLevel: 5
};

exports.help = {
    name: 'give-premium',
    description: 'give someone premium.',
    usage: 'give-premium [userid]'
};