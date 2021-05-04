const { prefix } = require("../../botconfig.json");

module.exports = {
    config: {
        name: "restart",
        description: "restarts the bot",
        usage: "wrestart",
        category: "moderation",
        accessableby: "Bot Owner",
        aliases: ["rs"]
    },
    run: async (bot, message, args) => {

    if(message.author.id != "778512157926883328") return message.channel.send("You're not bot the owner!")

    try {
        //I want to do the destroy/login command here...
        client.destroy()
        client.login(process.env.token);
    } catch(e) {
        message.channel.send(`ERROR: ${e.message}`)
    }



    }
}