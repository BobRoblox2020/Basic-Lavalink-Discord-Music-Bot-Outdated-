const config = require("../config.json");
module.exports = async (client) => {
client.manager.init(client.user.id);
client.setMaxListeners(10)
console.log(`[BOT]: ${client.user.tag} is ready!`);
setInterval(() => {client.user.setActivity(`${config.prefix}help`, {type: 'STREAMING', url: 'https://www.twitch.tv/nocopyrightsounds'})}, 5000);
};