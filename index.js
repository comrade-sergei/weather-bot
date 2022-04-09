// Starter Variables
const { Client, Intents } = require('discord.js');
const weather = require('weather-js');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') })
const token = process.env.token

const client = new Client({ 
  intents: [
    "GUILDS",
    "GUILD_MESSAGES"
  ] 
});

// Variables
const prefix = '!';

// Intialization
client.on("ready", function(){
  console.log(client.user.tag);
});

client.on("messageCreate", (message) => {

  //if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(1).trim().split(' ');
  const command = args.shift().toLowerCase();

  if (message.content == prefix + "ping") {
    message.reply(`${Date.now() - message.createdTimestamp}ms.`);
  }

  if (message.content == prefix + "help") {
    message.reply('```!ping```')
  }

  if (message.content == prefix + "weather") {

    weather.find({search: 'Toronto, CA', degreeType: 'C'}, function(err, result) {
      if(err) console.log(err);
     
      //console.log(JSON.stringify(result, null, 2));
      var stringified = JSON.stringify(result, null, 2);
      var parsed = JSON.parse(stringified);

      message.reply("The temperature in Toronto is " + parsed[0].current.temperature + "°C");
    });

  }
}); 

// Load
client.login(token);