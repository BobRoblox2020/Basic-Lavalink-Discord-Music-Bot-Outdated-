module.exports = {
    name: "ping",
    aliases: [],
    description: "Pong!",
    category: "utility",
    cooldown: 5,
    run: async (client, message, args) => {
  message.channel.send(`Pong! \`${client.ws.ping}ms\``)
  }
}