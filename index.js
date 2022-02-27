const discord = require("discord.js");
const {token} = require("./config.json")
const {Intents} = require("discord.js");

const client = new discord.Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS] });

client.manager = require('./events/manager')(client);
client.on("raw", (d) => client.manager.updateVoiceState(d));
client.commands = new discord.Collection();
client.aliases = new discord.Collection();
client.cooldowns = new discord.Collection();
client.slashcommands = new discord.Collection();

["Handler"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});
//error decator
process.on("unhandledRejection", (reason, promise) => {
  try {
      console.error("Unhandled Rejection at: ", promise, "reason: ", reason.stack || reason);
  } catch {
      console.error(reason);
  }
});

client.login(token)