const { Client } = require("discord.js");
const { MessageEmbed } = require("discord.js");
const Discord = require('discord.js');
module.exports = {
    name: 'sum*',
    category: 'other',
    execute(message, args, client) {
        const numArgs = args.map(x => parseFloat(x));
    const sum = numArgs.reduce((counter, x) => counter *= x);
    message.lineReply(`Сумма этих чисел будет ${sum}!`);
    },
};