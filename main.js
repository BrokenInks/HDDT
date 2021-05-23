const { config } = require("dotenv");
const fs = require("fs");
const { Client } = require("discord.js");
const { MessageEmbed } = require("discord.js");
const Discord = require('discord.js');
const beautify = require("beautify");
const { prefix, token } = require('./config.json');
require('discord-reply'); //⚠️ IMPORTANT: put this before your discord.Client()
const client = new Discord.Client();
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

client.categories = fs.readdirSync("./commands/");

["command"].forEach(handler => {
	require(`./handlers/${handler}`)(client);
});

const cooldowns = new Discord.Collection();

client.once('ready', () => {
	console.log(`${client.user.tag} запустился!`);
	console.log('Создатель бота: invalid-user#0208')
	client.channels.cache.get(`835043321818775607`).send('```Я запущен```')
	setInterval(function(){
		let stausi = [
	  'My Owner: invalid-user#0208'
		]
		let aye_status = stausi[Math.floor(Math.random() * stausi.length)]
		
		client.user.setActivity(`${aye_status}`,{ type: 'WATCHING'}, { status: 'idle'})
		},60000);
	  });

client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    
	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;

	if (command.args && !args.length) {
			let reply = `Ты не правильно написал команду, ${message.author}!`;
		
				if (command.usage) {
					reply += `\nПравильное написание команды ${command.name}: \`${prefix}${command.name} ${command.usage}\``;
				}
		
				return message.channel.send(reply);
			}


			if (!cooldowns.has(command.name)) {
				cooldowns.set(command.name, new Discord.Collection());
			}
			
			const now = Date.now();
			const timestamps = cooldowns.get(command.name);
			const cooldownAmount = (command.cooldown || 3) * 1000;
			
			if (timestamps.has(message.author.id)) {
				if (!cooldowns.has(command.name)) {
					cooldowns.set(command.name, new Discord.Collection());
				}
				
				const now = Date.now();
				const timestamps = cooldowns.get(command.name);
				const cooldownAmount = (command.cooldown || 3) * 1000;
				
				if (timestamps.has(message.author.id)) {
					if (timestamps.has(message.author.id)) {
						const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
					
						if (now < expirationTime) {
							const timeLeft = (expirationTime - now) / 1000;
							return message.reply(`пожалуйста подождите ${timeLeft.toFixed(1)} секунд что бы использовать команду \`${command.name}\` `);
						}

						timestamps.set(message.author.id, now);
setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

					}
				}
			}

			try {
				command.execute(message, args, client);    } catch (error) {        console.error(error);
			  }
			  });

client.login(token);
