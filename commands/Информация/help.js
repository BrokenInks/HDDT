const { Client } = require("discord.js");
const { MessageEmbed } = require("discord.js");
const Discord = require('discord.js');
const { readdirSync } = require("fs");
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "help",
  aliases: ["h"],
  description: "Показ всех команд бота",
  async execute(message, args, client)  {


    const roleColor =
      message.guild.me.displayHexColor === "#000000"
        ? "#ffffff"
        : message.guild.me.displayHexColor;

    if (!args[0]) {
      let categories = [];

      readdirSync("./commands/").forEach((dir) => {
        const commands = readdirSync(`./commands/${dir}/`).filter((file) =>
          file.endsWith(".js")
        );

        const cmds = commands.map((command) => {
          let file = require(`../../commands/${dir}/${command}`);

          if (!file.name) return "No command name.";

          let name = file.name.replace(".js", "");

          return `\`${name}\``;
        });

        let data = new Object();

        data = {
          name: dir.toUpperCase(),
          value: cmds.length === 0 ? "In progress." : cmds.join(" "),
        };

        categories.push(data);
      });

      const embed = new MessageEmbed()
        .setTitle("📬 Не знаешь команд? Вот все команды бота:")
        .addFields(categories)
        .setDescription(
          `Использование \`${prefix}help\` за которым следует имя команды, чтобы получить дополнительную информацию о команде. Например: \`${prefix}help bot\`.`
        )
        .setFooter(
          `Requested by ${message.author.tag}`,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setTimestamp()
        .setColor(roleColor);
      return message.channel.send(embed);
    } else {
      const command =
        client.commands.get(args[0].toLowerCase()) ||
        client.commands.find(
          (c) => c.aliases && c.aliases.includes(args[0].toLowerCase())
        );

      if (!command) {
        const embed = new MessageEmbed()
          .setTitle(`Такой команды не существует! Используй \`${prefix}help\` чтобы просмотреть все команды бота!`)
          .setColor("FF0000");
        return message.channel.send(embed);
      }

      const embed = new MessageEmbed()
        .setTitle("Детали команды:")
        .addField("Префикс:", `\`${prefix}\``)
        .addField(
          "Команда:",
          command.name ? `\`${command.name}\`` : "Нет имени для этой команды."
        )
        .addField(
          "Псевдонимы:",
          command.aliases
            ? `\`${command.aliases.join("` `")}\``
            : "Для этой команды нет псевдонимов."
        )
        .addField(
          "Аргументы:",
          command.usage
            ? `\`${prefix}${command.name} ${command.usage}\``
            : `\`${prefix}${command.name}\``
        )
        .addField(
          "Описание:",
          command.description
            ? command.description
            : "No description for this command."
        )
        .setFooter(
          `Команда выполнена ${message.author.tag}`,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setTimestamp()
        .setColor(roleColor);
      return message.lineReply(embed);
    }
  },
};