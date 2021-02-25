const Discord = require('discord.js');
module.exports = {
    name: "restart",
    run: async (message, args, client) => {
        if (message.author.id !== '778512157926883328') {
            return message.channel.send(`You cannot use this command!`)
        }
        await message.channel.send(`Restarting bot...`)
        process.exit();
    }
}
