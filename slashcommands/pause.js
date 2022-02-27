const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require("discord.js")


module.exports = {
    data: new SlashCommandBuilder()
    .setName("pause")
    .setDescription("Pause a song!"),
    
    async run(interaction, client) {
        const player = client.manager.players.get(interaction.guild.id)
        if(!player) return interaction.followUp({ content: "There aren't any song!", ephemeral: true })
        if(player.paused) {
          player.pause(false)
          interaction.followUp("The song is no longer paused!")
        } else {
          player.pause(true)
          interaction.followUp("The song is paused!")
        }
    }
}