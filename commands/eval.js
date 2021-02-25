Const Discors = require('discord.js');
module.exports = {
    name: "eval",
    description: "Evaluates a given code",
    run: async(message, args, client) => {
          if(message.author.id !== '778512157926883328') return;
            return message.reply("Only the bot owner may use this command!")
        }
        let result = eval(args.join(" "))
        message.channel.send(result)
    }
}
