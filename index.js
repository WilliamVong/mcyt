const { BaseCluster } = require('kurasuta');
module.exports = class extends BaseCluster {
    launch() {
        const Discord = require("discord.js"),
            client = new Discord.Client(),
            keepAlive = require('./server.js'),
            settings = require('./config/settings.json'),
            mongoose = require('mongoose'),
            chalk = require('chalk');
        var express = require('express');
        var phin = require('phin')
        var app = express();
        var config = require('./config/config.json')
        const Topgg = require("@top-gg/sdk");

        const webhook = new Topgg.Webhook("discord");
        const { DJSPoster } = require('topgg-autoposter')
        const ap = new DJSPoster(process.env.topgg, client)

        ap.on('posted', () => {
            console.log('Posted stats to Top.gg!')
        })

        let modules = [
            "ao3",
            "fun",
            "images",
            "info",
            "owner",
            "players",
            "utility"
        ],
            fs = require("fs");

        require('./util/eventLoader.js')(this.client);

        this.client.commands = new Discord.Collection(),
            this.client.aliases = new Discord.Collection();
        modules.forEach(c => {
            let cmds = 0;
            fs.readdir(`./commands/${c}/`, (err, files) => {
                if (err) throw err;
                files.forEach(f => {
                    const props = require(`./commands/${c}/${f}`);
                    this.client.commands.set(props.help.name, props);
                    props.conf.aliases.forEach(alias => {
                        this.client.aliases.set(alias, props.name);
                    });
                });
            });

        });

        mongoose.connect(`mongodb+srv://thunder:${process.env.mdbp}@mcyt.pnelb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true }, err => {
            if (err) return console.error(err);
        });

        this.client.elevation = message => {
            if (message.channel.type === 'dm') return;
            let permlvl = 0;
            if (message.member.hasPermission("MANAGE_MESSAGES")) permlvl = 1;
            if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
            if (message.member.hasPermission("MANAGE_GUILD")) permlvl = 3;
            if (message.member.id === message.guild.ownerID) permlvl = 4;
            if (message.author.id === settings.ownerid) permlvl = 5;
            return permlvl;
        };

        let startTime = new Date

        /*
        client.on('debug', info => {
            fs.appendFileSync(`./logs/${startTime}`, `${info}\n`);
        });

        fs.writeFileSync(`./logs/${startTime}`, '');*/
        //keepAlive();'


        this.client.login(process.env.token);

    }
};

