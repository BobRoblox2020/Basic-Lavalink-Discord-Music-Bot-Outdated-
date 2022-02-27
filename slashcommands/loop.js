const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require("discord.js")


module.exports = {
    data: new SlashCommandBuilder()
    .setName("loop")
    .setDescription("Loop song"),
    
    async run(interaction, client) {
        const player = client.manager.players.get(interaction.guild.id)
        if(!player) return interaction.followUp({ content: "There aren't any song!", ephemeral: true })
        if(player.queueRepeat){
          player.setQueueRepeat(false)
          interaction.followUp("Loop Disabled!")
        } else {
          player.setQueueRepeat(true)
          interaction.followUp("Loop Enabled!")
        }
    }
}