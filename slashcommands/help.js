const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageActionRow, MessageSelectMenu, MessageEmbed, Message } = require("discord.js");
const simplydjs = require('simply-djs')
const config = require('../config.json')


module.exports = {
    data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Show bot commands."),
    
    async run(interaction, client) {
        const row = new MessageActionRow()
        .addComponents(
          new MessageSelectMenu()
          .setCustomId("Hello")
          .setPlaceholder("Select")
          .addOptions([
            {
              label: "Music Commands",
              description: "Show Music Slash Commands List!",
              value: "music",
              emoji: "941994518218145792"
            },
            {
              label: "Utility Commands",
              description: "Show Utility Slash Comamnds List.",
              value: "util",
              emoji: "🔨"
            }
          ])
        )
        const embed1 = new MessageEmbed()
        .setColor(config.color)
        .setTitle(":wave: Sup, Noob Bot is here!")
        .setDescription(`If you want Bot Commands, just select \`Commands\` in dropdown menu`)
        interaction.followUp({ embeds: [embed1], components: [row] })
        const embed2 = new MessageEmbed()
        .setTitle("Music Commands")
        .setDescription("`play`, `stop`, `skip`, `nowplaying`, `loop`, `resume`, `pause`")
        .setColor(config.color)
        const embed3 = new MessageEmbed()
        .setTitle("Utility Commands")
        .setDescription("`help`, `ping`")
        .setColor(config.color)
        let filter = i => interaction.user.id === i.user.id
        const collector = interaction.channel.createMessageComponentCollector({
          filter,
          componentType: "SELECT_MENU",
          time: 60000
        })
        collector.on("collect", async (collected) => {
          const value = collected.values[0]
          if(value === "music"){
            collected.update({embeds: [embed2], ephemeral:true})
          } 
          if(value === "util") {
              collected.update({embeds: [embed3], ephemeral:true})
          }
        })
    }
}