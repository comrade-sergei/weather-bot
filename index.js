/*
Omid Yaqub and Dylan Burke
04/08/2022

Last Updated: 04/09/2022 @ 1:01 AM EST

https://github.com/comrade-sergei/weather-bot
*/


/* READ AND THEN DELETE....
  USE GOOGLE TRANSLATE API TO MAKE IT WORK IN ANY LANGUAGE ((USE ARGS FOR IDENTIFICATION)).
*/

// Modular Variables
const { Client, Intents } = require('discord.js');
const weather = require('weather-js');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') })

// Variables
const prefix = '!';
const token = process.env.token

// Intialization
const client = new Client({ 
  intents: [
    "GUILDS",
    "GUILD_MESSAGES"
  ] 
});

client.on("ready", function(){
  console.log(client.user.tag);
});

client.on("messageCreate", (message) => {

  //if (!message.content.startsWith(prefix) || message.author.bot) return; // put this into use.

  const args = message.content.slice(1).trim().split(' ');
  const command = args.shift().toLowerCase(); // put into use.

  if(message.content == prefix + "ping") {
    message.reply(`${Date.now() - message.createdTimestamp}ms.`); // fix times. currently == - numbers.
  }

  if(message.content == prefix + "help") {
    message.reply('```!ping```') // make it look better, use embeds.
  }

  if(message.content == prefix + "weather") {

    weather.find({search: 'Toronto, CA', degreeType: 'C'}, function(err, result) { // add args support (for multiple places).
      if(err) console.log(err);
     
      //console.log(JSON.stringify(result, null, 2)); // debug.
      var stringified = JSON.stringify(result, null, 2);
      var parsed = JSON.parse(stringified);

      message.reply("The temperature in Toronto is " + parsed[0].current.temperature + "°C"); // improve looks.
    });
  }

  if(message.content == prefix + "debug") {
    message.reply("coming soon"); // replace with actual debugging at some point.
  }
  
}); 

// Start
client.login(token);