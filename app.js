// Starter
const Discord = require('discord.js');
const axios = require('axios');
const Weather = require('weather.js');
const client = new Discord.Client();
const prefix = '!';

// Intialize
client.on("ready", function(){
  console.log(client.user.username);
  client.user.setPresence({
    status: 'online',
    activity: {
      name: "to swagger.json",
      type: 'LISTENING'
    }
  })
});

// Function
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

  if(command == "debug") {
    message.channel.send('debug coming soon!!');
    const apiURL = `${apiData.url}${apiData.type}/${apiData.id}`;
    console.log(apiURL);
    message.channel.send(apiURL);
  }

  if(command == "getForecast") {
      message.channel.send("City entered");

      const url = `https://api.openweathermap.org/data/2.5/weather?q=${args}&units=metric&appid=${process.env.weathertoken}`;
      const response = await axios.get(url);
      const city = response.data;
      message.channel.send(city);
    }
});

// Load
client.login(process.env.token);