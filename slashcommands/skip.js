const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require("discord.js")


module.exports = {
    data: new SlashCommandBuilder()
    .setName("skip")
    .setDescription("Skip a song!"),
    
    async run(interaction, client) {
        const player = client.manager.players.get(interaction.guild.id)
        if(!player) return interaction.followUp({ content: "There aren't any song!", ephemeral: true })
        player.stop()
        interaction.followUp("Successfully skip song!")
    }
}