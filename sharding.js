const { ShardingManager } = require('kurasuta');
const { join } = require('path');
const chalk = require('chalk');
const config = require('./config/shardconfig.json')
const fs = require('fs')

const sharder = new ShardingManager(join(__dirname, 'index'), {
	token: process.env.token,
    shardCount: config.shardCount
});


sharder.on("ready", async (cluster) => {
    console.log(chalk.green.bold(`Shard ${cluster.id + 1} is ready.`))
})
sharder.spawn();
