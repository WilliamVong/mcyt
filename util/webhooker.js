const config = require("../config/config.json")
const Topgg = require("@top-gg/sdk");
var express = require('express');

var phin = require('phin')
var app = express();

var webhookurl = config.webhookurl,
    bodyParser = require('body-parser'),
    chalk = require("chalk");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

var client = mainfile.client
app.post("/hook", async function(req, res) {
    if (req.headers.authorization !== config.auth) return res.send({ code: "invalid auth" });
    var user_id = req.body.user;
    var bot = req.body.bot;
    const author = await client.users.fetch(user_id)
    console.log(chalk.yellow(`${author.tag} voted for the bot! `));
    author.send("Thanks for voting! You recieved 1 hour of premium!")
    const channel = client.channels.cache.get('811112730702118912')
    channel.send(author.tag + " voted!")
    await User.findOne({
        userID: user_id
    }, (err, user) => {
        let currentPremium = user.premiumUntil
        if (!user) {
            let newpremium = new User({
                _id: mongoose.Schema.Types.ObjectId,
                userID: user_id,
                premiumUntil: Date.now() + 1000*60*60
            })
            newpremium.save()
        } else {
            if (currentPremium < Date.now()) {
                newPremium = Date.now() + 1000*60*60
            } else {
                newPremium = currentPremium + 1000*60*60
            }
            user.premiumUntil = newPremium;
            user.save()
        }
    });
    res.send({ code: "success" });
});
app.get("/", async function(req, res) {
    res.send("dis is not a website kthx")
});
var listener = app.listen(3000, function() {
    console.log(chalk.yellow(`Vote checker started on ${listener.address().port}!`));
});

