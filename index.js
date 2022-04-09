// Starter Variables
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// Variables
const prefix = '!';

// Intialization
client.on("ready", function(){
  console.log(client.user.tag);
});

client.on("message", (message) =>{

  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(1).trim().split(' ');
  const command = args.shift().toLowerCase();

  if (command == "ping") {
    message.channel.send(`${Date.now() - message.createdTimestamp}ms.`);
  }

  if (command == "help") {
    message.channel.send('```!ping```')
  }
}); 


// Load
client.login('OTYyMTA5NTA4NTg5NjEzMTA2.YlCwTQ.4AYUJUtybnpXSXWHVTNa916IAtU');