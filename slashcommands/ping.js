const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require("discord.js")


module.exports = {
    data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Pong!"),
    
    async run(interaction, client) {
        interaction.followUp(`Pong! \`${client.ws.ping}ms\``)
    }
}