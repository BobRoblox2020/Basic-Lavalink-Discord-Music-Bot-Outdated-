const fs = require("fs");

module.exports = (client) => {
//event handler
const eventFiles = fs
.readdirSync(`./events/`).filter((file) => file.endsWith(".js"));
for (let file of eventFiles) {
  try {
  const Event = require(`../events/${file}`);
  if (Event.event && typeof Event.event !== "string") { continue }
  Event.event = Event.event || file.replace(".js", "")
  client.on(file.split(".")[0], (...args) => Event(client, ...args));
  } catch (err) {
  console.log("Error While loading")
  console.log(err)
  }
}

//slashcommand handler
const slashcommandsFiles = fs.readdirSync("./slashcommands").filter(file => file.endsWith("js"))
for(const file of slashcommandsFiles){
  const slash = require(`../slashcommands/${file}`)
  client.slashcommands.set(slash.data.name, slash)
}

//command handler
    let folders = fs.readdirSync("./commands/");
    folders.forEach((category) => {
        const commandFiles = fs
            .readdirSync(`./commands/${category}/`)
            .filter((file) => file.endsWith(".js"));
        for (const file of commandFiles) {
            const command = require(`../commands/${category}/${file}`);
            if (command.name) {
                client.commands.set(command.name, command);;
            }
            client.commands.set(command.name, command);
        }
    });
}
