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
const {Client, Intents, Discord, MessageEmbed} = require('discord.js');
const weather = require('weather-js');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

// Variables
const prefix = '!';
const token = process.env.token;

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

  if (!message.content.startsWith(prefix) || message.author.bot) return; // put this into use.

  const args = message.content.slice(1).trim().split(' ');
  const command = args.shift().toLowerCase(); // put into use.

  if(command == "ping") {
    message.reply(`${Date.now() - message.createdTimestamp}ms.`); // fix times. currently == - numbers.
  }

  if(command == "help") {
    message.reply('```!ping, !help, !weather, !dc```') // make it look better, use embeds.
  }

  if(command == 'weather') {
    if (args.at(0) != null){
    weather.find({search: args.at(0), degreeType: 'C'}, function(error, result) { // add args support (for multiple places).
     
      if(error) console.log(error);
     
      var stringified = JSON.stringify(result, null, 2);
      var parsed = JSON.parse(stringified);
      if (parsed[0] != undefined){
      message.reply("The temperature in " + args.at(0) + " is " + parsed[0].current.temperature + "°C"); // improve looks.
    }
    
    else message.reply("Enter a valid city with no spaces");
    });
  }
  else{
    message.reply("Enter a city");
  }
  }
  

  if(command == "dc") {
    message.reply('Disconnected!');
    client.destroy();
    process.exit(0);
  }

}); 

// Start
client.login(token);