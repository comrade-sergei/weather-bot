const Discord = require('discord.js');
const axios = require('axios');
const client = new Discord.Client();
const prefix = '!';

client.on("ready", function(){
  console.log(client.user.username);
  client.user.setPresence({
    status: 'online',
    activity: {
      name: "with swagger.json",
      type: 'PLAYING'
    }
  })
});

client.on("message", (message) =>{

  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(1).trim().split(' ');
  const command = args.shift().toLowerCase();

  if (command == "ping") {
    message.channel.send(`${Date.now() - message.createdTimestamp}ms.`);
  }

  if (command == "help") {
    const helpEmbed = new Discord.MessageEmbed()
    .setColor('#154fad')
    .setTitle('**How to use the TeachAssist Bot**')
    .setDescription(`

      !ping
      !help

    `)
    .setTimestamp()
    .setFooter('TeachAssist Bot', 'https://cdn.discordapp.com/attachments/962109342407082067/962114089058992209/unnamed.jpg')

    message.channel.send(helpEmbed);
  }

  if(command == "getMarks") {
    message.channel.send("test");
  }
});

client.login(process.env.token);