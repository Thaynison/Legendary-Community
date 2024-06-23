require("dotenv").config();
const Discord = require("discord.js");
const express = require("express");

const client = new Discord.Client({
    intents: [
        32767, Discord.GatewayIntentBits.GuildMessages,
        Discord.GatewayIntentBits.MessageContent,
    ]
});

client.on("interactionCreate", async (interaction) => {
    if (interaction.type === Discord.InteractionType.ApplicationCommand) {
        const cmd = client.slashCommands.get(interaction.commandName);
        if (!cmd) return interaction.reply(`Error`);
        interaction["member"] = interaction.guild.members.cache.get(interaction.user.id);
        cmd.run(client, interaction);
    }
});

client.slashCommands = new Discord.Collection();
require('./handler')(client);

client.on("ready", async () => {
    console.log("Olá, estou online!");
});

client.login(process.env.TOKEN_BOT);

const app = express();
const port = 3000;

app.get("/", (req, res) => {
    res.send("Bot de Discord está rodando!");
});

app.listen(port, () => {
    console.log(`Servidor Express rodando na porta ${port}`);
});

module.exports = app;
