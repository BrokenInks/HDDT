const { Client } = require("discord.js");
const { MessageEmbed } = require("discord.js");
const Discord = require('discord.js');
module.exports = {
    name: 'reload',
    category: 'owner',
    execute(message, args, client) {
        if (message.author.id !=="778512157926883328") return message.channel.send("No, this owner command");
        if (!args[0]) return message.lineReply("You must input category.");
        if (!args[1]) return message.lineReply("You must input a command name.");

        let category = args[0].toLowerCase();
        let command = args[1].toLowerCase();

        try{
            delete require.cache[require.resolve(`../../commands/${category}/${command}.js`)];
            client.commands.delete(command);

            const pull = require(`../../commands/${category}/${command}.js`);
            client.commands.set(command, pull);

            return message.lineReply(`Done reload **${command}**`);
        }catch (error) {
            return message.lineReply(`Error reloaind **${command}**: \`${error.message}\``)
        }
    }}