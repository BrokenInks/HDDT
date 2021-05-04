const Discord = require("discord.js");
const start = "⏳";

exports.run = async (bot,message,args) => {
    let timefish = Math.floor(Math.random() * 30000);

    let times = await message.channel.send('Подождите, пока пройдет время, и поймайте рыбу.');
    await times.react(start);
    await times.awaitReactions(reaction => reaction.emoji.name === start, {time: timefish});

    let temp = ['+', '-'];
    let fishs = [
        '🐟 Обычный Рыбу',
        '🐠 Тропическая Рыба',
        '🐡 Иглобрюх',
        '🦈 Акула',
        '🐬 Дельфин',
        '🐳 Кит',
    ];
    let second = Math.floor(Math.random()*999)
    let result1 = Math.floor((Math.random() * fishs.length));
    let result2 = Math.floor((Math.random() * temp.length));

    let embed = new Discord.MessageEmbed()
    .setColor('42aaff')
    .setTitle('🎣 Рыбалка')
    .addField('Ты поймал:', fishs[result1], true)
    .addField('Время ушло:', timefish + ' мс', true)
    .addField('Информация:', `🐟 ${Math.floor(Math.random()*10)},${second} кг\n📏 ${Math.floor(Math.random()*50)},${second} см\n🌡️ ${temp[result2]}${Math.floor(Math.random()*25)}°`)

    message.channel.send(message.author.username + ', вот ваши результаты.', embed);
};

exports.help = {
    name: 'fish',
    description: 'Ловите свою рыбу на рыбалке.',
    usage: 'fish'
};