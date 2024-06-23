const { error } = require("console")
const fs = require("fs")
module.exports = async (client) => {
    const SlashsArray = []

    fs.readdir(`./Comandos/`, (error, folder) => {
        folder.forEach(subfolder => {
            fs.readdir(`./Comandos/`, (error, files) => {
                files.forEach(files => {
                    if (!files.endsWith('.js')) return;
                    files = require(`../Comandos/${files}`);
                    if (!files?.name) return;
                    client.slashCommands.set(files?.name, files)

                    SlashsArray.push(files)
                });
            });
        });
    });
    client.on("ready", async () => {
        try {
            await client.application?.commands.set(SlashsArray);
            console.log("Slash commands registrados com sucesso.");
        } catch (error) {
            console.error("Erro ao definir comandos slash:", error);
        }
    });
};