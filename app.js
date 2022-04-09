// Starter
const Discord = require('discord.js');
//const weather = require('weather-js');
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
  }

/*  if(command == "getForecast") {
      weather.find({search: args.join(" "), degreeType: `C`}, function (error, result) {
        if(error) return message.channel.send(error);
        if(!args[0]) return message.channel.send('Please specify a location!')

        var current = result[0].current;
        var location = result[0].location;

        const embed = new Discord.MessageEmbed()
        .setColor(0x111111)
        .setAuthor(`Weather forecast for ${current.observationpoint}`)
        .setThumbnail(current.imageUrl)
        .setDescription(`**${current.skytext}**`)
        .addField('TimeZone', `UTC ${location.timezone}`, true)
        .addField('Degree Type', 'Celcius', true)
        .addField('Temperature', `${current.temperature}°`, true) 
        .addField('Wind', `${current.winddisplay}`, true)
        .addField('Feels Like', `${current.feelslike}°`, true)
        .addField('Humidity', `${current.humidity}%`, true)

        message.channel.send(embed)
      })
    }
    */
});

// Load
client.login(process.env.token);