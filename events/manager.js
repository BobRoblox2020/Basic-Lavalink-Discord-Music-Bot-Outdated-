const { Manager } = require("erela.js");
const { MessageEmbed } = require('discord.js')

module.exports = function(client) {
    return new Manager({
    nodes: [
        {
            host: "lava.link",
            port: 80,
            password: "youshallnotpass",
            secure: false,
        },
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
        console.log(`Node ${node.options.identifier} had an error: ${error.message}`)
      )
      .on("trackStart", (player, track) => {
        client.channels.cache
          .get(player.textChannel)
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