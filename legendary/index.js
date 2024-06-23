require("dotenv").config();
const Discord = require("discord.js");
const express = require("express");
const path = require("path");

const client = new Discord.Client({
    intents: [
        32767, Discord.GatewayIntentBits.GuildMessages,
        Discord.GatewayIntentBits.MessageContent,
    ]
});

client.slashCommands = new Discord.Collection();
require('./handler')(client);

client.on("interactionCreate", async (interaction) => {
    if (interaction.type === Discord.InteractionType.ApplicationCommand) {
        const cmd = client.slashCommands.get(interaction.commandName);
        if (!cmd) return interaction.reply(`Error`);
        interaction["member"] = interaction.guild.members.cache.get(interaction.user.id);
        cmd.run(client, interaction);
    }
});

client.on("ready", async () => {
    console.log("Olá estou online!");
});

client.login(process.env.TOKEN_BOT);

// Configuração do servidor Express
const app = express();
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index', { bot: client });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
