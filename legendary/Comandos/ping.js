const Discord = require("discord.js")

module.exports = {
    name: "ping",
    description: "ping do servidor",
    type: Discord.ApplicationCommandType.ChatInput,
    run: async (client, interaction) => {
        interaction.reply({content: `Opa, meu ping é \`${client.ws.ping}\``})
    }
}