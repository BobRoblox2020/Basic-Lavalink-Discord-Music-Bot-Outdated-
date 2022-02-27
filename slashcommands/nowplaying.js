const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require("discord.js")
const moment = require('ms')
const config = require('../config.json')


module.exports = {
    data: new SlashCommandBuilder()
    .setName("nowplaying")
    .setDescription("Show now playing song!"),
    
    async run(interaction, client) {
          
        const player = await client.manager.players.get(interaction.guild.id)
        let song = player.queue.current;
        const duration = song.duration
        if(!player) return interaction.followUp({ content: "There aren't any song!", ephemeral: true })
        const msg = await interaction.followUp({
          embeds: [
            new Discord.MessageEmbed()
              .setColor(config.color)
              .setTitle(`**Currently Playing**`)
              .setDescription(`[${song.title}](${song.uri})`)
              .addFields([
                  {
                      name: "Duration",
                      value: `\`${moment(duration)}\``,
                      inline: true
                  },
                  {
                      name: "Requested by",
                      value: `${song.requester}`,
                      inline: true
                  }
              ])
              .setThumbnail(song.thumbnail)
          ]
        })
    }
}