const Discord = require('discord.js');
const { readdirSync } = require("fs");
const prefix = require("../../config.json").prefix;

module.exports = {
    name: "help",
    aliases: ["cmds", "commands"],
    description: "Show commands info.",
    category: "utility",
    usage: "$help <command>",
    hidden: true,
    cooldown: 1,
    run: async (client, message, args) => {
      const config = require('../../config.json')
      const row2 = new Discord.MessageActionRow()
      .addComponents(
        new Discord.MessageSelectMenu()
        .setCustomId("Hello")
        .setPlaceholder("Select")
        .addOptions([
          {
            label: "Home",
            description: "Go back to home.",
            value: "home",
            emoji: "🏠"
          },
          {
            label: "Commands",
            description: "Show bot commands!",
            value: "commandlist",
            emoji: "🤖"
          },
          {
            label: "Support",
            description: "Please support us : )",
            value: "support",
            emoji: "👍"
          }
        ])
      )
    
      if (!args[0]) {
        let categories = [];
        const ignorecategories = []
        const emoji = {
          utility: "🔨",
          music: "🎵"
        }
  
        readdirSync("./commands/").forEach((dir) => {
          const editedName = `${emoji[dir]} ${dir.toUpperCase()}`
          if(ignorecategories.includes(dir)) return;
          const commands = readdirSync(`./commands/${dir}/`).filter((file) =>
            file.endsWith(".js")
          );
  
          const cmds = commands.filter((command) => {
            let file = require(`../../commands/${dir}/${command}`)

            return!file.hidden;
          }).map((command) => {
            let file = require(`../../commands/${dir}/${command}`);
  
            if (!file.name) return "No command name.";
  
            let name = file.name.replace(".js", "");
  
            return `\`${name}\``;
          });
  
          let data = new Object();
  
          data = {
            name: editedName,
            value: cmds.length === 0 ? "Currently unavailable." : cmds.join(" "),
          };
  
          categories.push(data);
        });
  
        const embed2 = new Discord.MessageEmbed()
        .setColor(config.color)
        .setTitle(":wave: Sup, Noob Bot is here!")
        .setDescription(`If you want Bot Commands, just select \`Commands\` in dropdown menu`)
        .addFields([
          {
            name: "Help?",
            value: "Select \`Support\` in dropdown and join our community!"
          }
        ])
        const messagecon = await message.channel.send({embeds: [embed2], components: [row2], ephemeral: true});

        const Helpembed = new Discord.MessageEmbed()
        .setTitle(`${message.author.username}, Here the commands!`)
        .addFields(categories)
        .setDescription(
          `Use \`<${prefix}command>\` to make all commands work. For example: \`${prefix}help\`.`
        )
        .setFooter(
          `Requested by ${message.author.tag}`,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setColor(config.color);
        const SupportEmbed = new Discord.MessageEmbed()
        .setColor(config.color)
        .setTitle(`Support Noob Bot!`)
        .addFields([
          {
            name: "Community",
            value: "[Join now!](https://discord.com/invite/rr2N4UaHk2)"
          }
        ])
        let filter = i => message.author.id == i.user.id
        const collector = message.channel.createMessageComponentCollector({
          filter,
          componentType: "SELECT_MENU",
          time: 60000
        })
        collector.on("collect", async (collected) => {
          const value = collected.values[0]

          if(value == "home"){
            collected.update({embeds: [embed2], ephemeral:true})
          }

          if(value === "commandlist"){
            collected.update({embeds: [Helpembed], ephemeral:true})
          } 
          if(value === "support") {
              collected.update({embeds: [SupportEmbed], ephemeral:true})
          }
        })
      } else {
        const command =
          client.commands.get(args[0].toLowerCase()) ||
          client.commands.find(
            (c) => c.aliases && c.aliases.includes(args[0].toLowerCase())
          );

        
        if (!command) {
          const embedfailed = new Discord.MessageEmbed()
            .setDescription(`Invalid command! Use \`${prefix}help\` for all of my commands!`)
            .setColor("FF0000");
          return message.channel.send({embeds: [embedfailed]});
        }
  
        const Deatailembed = new Discord.MessageEmbed()
          .setTitle("Command Details:")
          .addField(
            "COMMAND:", command.name ? `\`${command.name}\`` : "No name for this command."
          )
          .addField(
            "ALIASES:", command.aliases
              ? `\`${command.aliases.join("` `")}\``
              : "No aliases for this command."
          )
          .addField(
            "USAGE:", command.usage
              ? `\`${prefix}${command.name} ${command.usage}\``
              : `\`${prefix}${command.name}\``
          )
          .addField(
            "DESCRIPTION:", command.description
              ? command.description
              : "No description for this command."
          )
          .setFooter(
            `Requested by ${message.author.tag}`,
            message.author.displayAvatarURL({ dynamic: true })
          )
          .setColor("AQUA");
        return message.channel.send({embeds: [Deatailembed]});
    }
  }
}

