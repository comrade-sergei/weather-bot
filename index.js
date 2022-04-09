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
const translate = require('@vitalets/google-translate-api');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

// Variables
const prefix = '!';
const token = process.env.token;
var language = 'de';

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
  const command = args.shift().toLowerCase();

  if(command == "ping") {
    message.reply(`${Date.now() - message.createdTimestamp}ms.`); // fix times. currently == - numbers.
  }

  if(command == "help") {
    message.reply('```!ping, !help, !temp, !dc, !translate, !set, !observationtime, !windspeed, !skytext, !date, !humidity```') // make it look better, use embeds.
  }

  if(command == 'temp' || command == 'temperature') {
    if (args.at(0) != null) {
    weather.find({search: args.at(0), degreeType: 'C'}, function(error, result) { // add args support (for multiple places).
     
      if(error) console.log(error);
     
      var stringified = JSON.stringify(result, null, 2);
      console.log(stringified);
      var parsed = JSON.parse(stringified);
      if (parsed[0] != undefined){
        translate("The temperature in " + args.at(0) + " is " + parsed[0].current.temperature + "°C" + ", it feels like " + parsed[0].current.feelslike + "°C", {to: language}).then(response => {
            message.reply(response.text);
        }); 
    } else {
      message.reply("Enter a valid city with no spaces.");
    }
    });
  } else {
    message.reply("Enter a city.");
  }
}

if(command == 'windspeed') {
  if (args.at(0) != null) {
  weather.find({search: args.at(0), degreeType: 'C'}, function(error, result) { // add args support (for multiple places).
   
    if(error) console.log(error);
   
    var stringified = JSON.stringify(result, null, 2);
    var parsed = JSON.parse(stringified);
    if (parsed[0] != undefined){
      translate("The windspeed in " + args.at(0) + " is " + parsed[0].current.windspeed , {to: language}).then(response => {
          message.reply(response.text);
      }); 
  } else {
    message.reply("Enter a valid city with no spaces.");
  }
  });
} else {
  message.reply("Enter a city.");
}
}

if(command == 'observationtime') {
  if (args.at(0) != null) {
  weather.find({search: args.at(0), degreeType: 'C'}, function(error, result) { // add args support (for multiple places).
   
    if(error) console.log(error);
   
    var stringified = JSON.stringify(result, null, 2);
    var parsed = JSON.parse(stringified);
    if (parsed[0] != undefined){
      translate("The time in " + args.at(0) + " is " + parsed[0].current.observationtime, {to: language}).then(response => {
          message.reply(response.text);
      }); 
  } else {
    message.reply("Enter a valid city with no spaces.");
  }
  });
} else {
  message.reply("Enter a city.");
}
}

if(command == 'skytext') {
  if (args.at(0) != null) {
  weather.find({search: args.at(0), degreeType: 'C'}, function(error, result) { // add args support (for multiple places).
   
    if(error) console.log(error);
   
    var stringified = JSON.stringify(result, null, 2);
    var parsed = JSON.parse(stringified);
    if (parsed[0] != undefined){
      translate("it is " + parsed[0].current.skytext + " " +"in "  + args.at(0), {to: language}).then(response => {
          message.reply(response.text);
      }); 
  } else {
    message.reply("Enter a valid city with no spaces.");
  }
  });
} else {
  message.reply("Enter a city.");
}
}

if(command == 'date') {
  weather.find({search: 'Toronto, CA', degreeType: 'C'}, function(error, result) { // add args support (for multiple places).
   
    if(error) console.log(error);
   
    var stringified = JSON.stringify(result, null, 2);
    var parsed = JSON.parse(stringified);
    if (parsed[0] != undefined){
      translate("the date is " + parsed[0].current.date, {to: language}).then(response => {
          message.reply(response.text);
      }); 
  } else {
    message.reply("Enter a valid city with no spaces.");
  }
  });
}

if(command == 'humdity') {
  if (args.at(0) != null) {
  weather.find({search: args.at(0), degreeType: 'C'}, function(error, result) { // add args support (for multiple places).
   
    if(error) console.log(error);
   
    var stringified = JSON.stringify(result, null, 2);
    var parsed = JSON.parse(stringified);
    if (parsed[0] != undefined){
      translate("the humidity is" + parsed[0].current.humidity + "in " + args.at(0), {to: language}).then(response => {
          message.reply(response.text);
      }); 
  } else {
    message.reply("Enter a valid city with no spaces.");
  }
  });
} else {
  message.reply("Enter a city.");
}
}

  if(command == "set") {
    console.log(language);
    message.reply('Language set to ' + args.at(0));
    language = args.at(0);
    console.log(language);
  }

  if(command == "dc") {
    message.reply("Disconnected.");
    client.destroy();
    process.exit(0);
  }

  if(command == "translate") {
    if(args.at(0) != null) {
      translate(args.at(0), {to: args.at(1)}).then(response => {
        message.reply(response.text);
      });
    } else {
      message.reply("Please enter something to translate. ``!convert [string] [target language]``.");
      message.channel.send("For reference: https://cloud.google.com/translate/docs/languages");
    }
  }

}); 

// Start
client.login(token);