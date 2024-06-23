require("dotenv").config();
const Discord = require("discord.js")
const client = new Discord.Client({
    intents: [
        32767, Discord.GatewayIntentBits.GuildMessages,
        Discord.GatewayIntentBits.MessageContent,
    ]
});

module.exports = client

client.on("interactionCreate", async (interaction) => {
    if(interaction.type === Discord.InteractionType.ApplicationCommand){
        const cmd = client.slashCommands.get(interaction.commandName);
        if (!cmd) return interaction.reply(`Error`);
        interaction["member"] = interaction.guild.members.cache.get(interaction.user.id);
        cmd.run(client,interaction)
    }
})

client.slashCommands = new Discord.Collection()
require('./handler')(client)

client.on("ready", async () => {
    console.log("Olá estou online!")
})

client.login(process.env.TOKEN_BOT)