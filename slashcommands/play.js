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
        const botchannel = interaction.guild.me.voice.channel
        if(!voiceChannel) {
          interaction.followUp({ content: "Please join a voice channel!" })
        }  else if (botchannel && !botchannel.equals(voiceChannel)) {
        interaction.followUp(`You Need to Join ${botchannel}!`)
        }

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
          
      switch (res.loadType) {
     	case "PLAYLIST_LOADED":
          {
            let playlist = res.tracks[0];
            await player.queue.add(res.tracks);
            interaction.followUp({
              embeds: [
                new Discord.MessageEmbed()
                  .setColor(config.color)
                  .setAuthor({name: `PLAYLIST ADDED TO QUEUE`})
                  .setDescription(`[\`${res.playlist.name}\`](${playlist.uri})`)
                  .addFields([
                    {
                      name: `**Tracks**`,
                      value: `\`${res.tracks.length}\``,
                    },
                  ])
              ],
            });
            if (!player.playing) {
              player.play()
            }
          }
          break;
        case "SEARCH_RESULT":
          {
            let track = res.tracks[0];
            await player.queue.add(track);
            interaction.followUp({
              embeds: [
                new Discord.MessageEmbed()
                  .setColor(config.color)
                  .setAuthor({name: `ADDED TO QUEUE`,})
                  .setDescription(`[${track.title}](${track.uri})`)
              ],
            });
            if (!player.playing) {
              player.play()
            }
          }
          break;
        case "TRACK_LOADED":
          {
            let track = res.tracks[0];
            await player.queue.add(track);
            interaction.followUp({
              embeds: [
                new Discord.MessageEmbed()
                  .setColor(config.color)
                  .setAuthor({name: `ADDED TO QUEUE`,})
                  .setDescription(`[${track.title}](${track.uri})`)
              ],
            });
            if (!player.playing) {
              player.play()
            }
          }
          break;
        default:
          break;
      }
    }
}
