const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require("discord.js")
const config = require('../config.json')


module.exports = {
    data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("Play a song!")
    .addStringOption(option => 
        option
        .setName("song")
        .setDescription("Song to play!")
        .setRequired(true)
    ),
    
    async run(interaction, client) {
        const voiceChannel = interaction.member.voice.channel
        if(!voiceChannel) return interaction.followUp({ content: "Please join a voice channel!" })

        const song = interaction.options.getString("song")
            const res = await client.manager.search(
                song,
                interaction.user
              );
              const player = client.manager.create({
                guild: interaction.guild.id,
                voiceChannel: interaction.member.voice.channel.id,
                textChannel: interaction.channel.id,
                selfDeafen: true,
                volume: 80,
              });
              player.connect();
          
              player.queue.add(res.tracks[0]);
          
              if (!player.playing && !player.paused && !player.queue.size)
              player.play();

          
              if (
                !player.playing &&
                !player.paused &&
                player.queue.totalSize === res.tracks.length
              )
              player.play();
                const embed = new Discord.MessageEmbed()
                .setTitle("NOW PLAYING")
                .setDescription(`[${res.tracks[0].title}](${res.tracks[0].uri})`)
                .setColor(config.color)
                interaction.followUp({ embeds: [embed] })
    }
}