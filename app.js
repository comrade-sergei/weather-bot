const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = '!';

client.on("ready", function(){
  console.log(client.user.username);
  client.user.setPresence({
    status: 'idle',
    activity: {
      name: "with YRDSB",
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
    message.channel.send('```no help for you. fuck off.```')
  }
}); 

client.login(process.env.token);