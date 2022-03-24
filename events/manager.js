const { Manager } = require("erela.js");
const Spotify = require('erela.js-spotify')
const { MessageEmbed } = require('discord.js');
const config = require('../config.json')

const clientID = "79ab9e85ef4c4bc28ae19cbe83cc32bc"
const clientSecret = "03a23e074ef34787b858853746e5337a"

module.exports = function(client) {
    return new Manager({
    nodes: [
        {
            host: "lava.link",
            port: 80,
            password: "youshallnotpass",
            secure: false,
            retryAmount: Infinity,
            retryDelay: 3000,
        },
      ],
      plugins: [
        new Spotify({ clientID, clientSecret })
      ],
      send(id, payload) {
        const guild = client.guilds.cache.get(id);
        if (guild) guild.shard.send(payload);
      },
      autoPlay: false,
    })
      .on("nodeConnect", node => 
        console.log(`[NODES]: Node ${node.options.identifier} connected`)
      )
      .on("nodeError", (node, error) => 
        console.log(`[NODES]: Node ${node.options.identifier} had an error: ${error.message}`)
      )
      .on("nodeReconnect", node => 
        console.log(`[NODES]: Node ${node.options.identifier} reconnecting`)
      )
      .on("nodeDisconnect", node => 
        console.log(`[NODES]: Node ${node.options.identifier} disconnected`)
      )
      .on("trackStart", (player, track) => {
        client.channels.cache
          .get(player.textChannel)
          .send({ embeds: [new MessageEmbed().setTitle("NOW PLAYING").setDescription(`[${track.title}](${track.uri})`).setColor(config.color)]})
      })
      .on("trackEnd", (player) => {
        client.channels.cache
          .get(player.textChannel)
          .send("Finished Playing Song!")
    
        player.destroy();
    })
    .on("trackAdd", (player) => {
        client.channels.cache
          .get(player.textChannel)
          .send(`Added the song to queue!`)
    
        player.destroy();
    });
}
