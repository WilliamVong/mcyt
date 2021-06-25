const fs = requrire("fs")

module.exports = client => {
  console.log(`You have been disconnected at ${new Date()}`);
        fs.appendFileSync(`./logs/connectionlog`, `[ ${(new Date).toString().split(" ").slice(1, 5).join(" ")} ] Bot disconnected\n`);
};
