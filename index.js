/*
Omid Yaqub and Dylan Burke
04/08/2022

Last Updated: 04/09/2022 @ 2:07 AM EST

https://github.com/comrade-sergei/weather-bot
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
var language = 'en';

// Intialization
const client = new Client({ 
  intents: [
    "GUILDS",
    "GUILD_MESSAGES"
  ] 
});

client.on("ready", function(){
  console.log(client.user.tag);

  client.user.setPresence({
    status: "online"
  });

  client.user.setActivity('Amongus Rap', { type: 'LISTENING' });
});

// Function
client.on("messageCreate", (message) => {

  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(1).trim().split(' ');
  const command = args.shift().toLowerCase();

  if(command == "help") {
    message.reply('```!help, !temp, !dc, !translate, !set, !observationtime, !windspeed, !skytext, !date, !humidity, !amongus, !rap, !convert```')
  }

  if(command == "amongus") {
    message.reply('https://www.youtube.com/watch?v=2AeEd195SG8');
  }

  if(command == "rap") {
    message.reply('https://www.youtube.com/watch?v=T59N3DPrvac');
  }

  if(command == 'temp' || command == 'temperature') {
    if (args.at(0) != null) {
    weather.find({search: args.at(0), degreeType: 'C'}, function(error, result) {
     
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
    weather.find({search: args.at(0), degreeType: 'C'}, function(error, result) {
    
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
    weather.find({search: args.at(0), degreeType: 'C'}, function(error, result) {
    
      if(error) console.log(error);
    
      var stringified = JSON.stringify(result, null, 2);
      var parsed = JSON.parse(stringified);
      if (parsed[0] != undefined){
        translate("The observation time in " + args.at(0) + " is " + parsed[0].current.observationtime, {to: language}).then(response => {
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
    weather.find({search: args.at(0), degreeType: 'C'}, function(error, result) {
    
      if(error) console.log(error);
    
      var stringified = JSON.stringify(result, null, 2);
      var parsed = JSON.parse(stringified);
      if (parsed[0] != undefined){
        translate("It's " + parsed[0].current.skytext + " in "  + args.at(0), {to: language}).then(response => {
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
  weather.find({search: 'Toronto, CA', degreeType: 'C'}, function(error, result) {
   
    if(error) console.log(error);
   
    var stringified = JSON.stringify(result, null, 2);
    var parsed = JSON.parse(stringified);
    if (parsed[0] != undefined){
      translate("The date is " + parsed[0].current.date + " in Toronto", {to: language}).then(response => {
          message.reply(response.text);
      }); 
  } else {
    message.reply("Enter a valid city with no spaces.");
  }
  });
}

if(command == 'humidity') {
  if (args.at(0) != null) {
    weather.find({search: args.at(0), degreeType: 'C'}, function(error, result) {
    
      if(error) console.log(error);
    
      var stringified = JSON.stringify(result, null, 2);
      var parsed = JSON.parse(stringified);
      if (parsed[0] != undefined){
        translate("The humidity in " + args.at(0) + " is " + parsed[0].current.humidity, {to: language}).then(response => {
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
    if(args.at(0) != null) {
      message.reply('Language set to ' + args.at(0));
      language = args.at(0);
    } else {
      message.reply('Enter a valid language code.');
      message.channel.send("For reference: https://cloud.google.com/translate/docs/languages");
    }
  }

  if(command == "dc") {
    message.channel.send("Disconnected.");
    client.destroy();
    process.exit(0);
  }

  if(command == "translate") {
    if(args.at(0) != null) {
      translate(args.at(0), {to: args.at(1)}).then(response => {
        message.reply(response.text);
      });
    } else {
      message.reply("Please enter something to translate. ``!translate [string] [target language]``.");
      message.channel.send("For reference: https://cloud.google.com/translate/docs/languages");
    }
  }

  if(command == "convert") {
    if(args.at(0) != null) {
      translate(args.at(0), {from: args.at(1), to: args.at(2)}).then(response => {
        message.reply(response.text);
      });
    } else {
      message.reply("Please enter something to translate. ``!convert [string] [origin language] [target language]``.");
      message.channel.send("For reference: https://cloud.google.com/translate/docs/languages");
    }
  }

}); 

// Start
client.login(token);