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
    const helpEmbed = new Discord.MessageEmbed()
    .setColor('#FF0000')
    .setTitle('**Nachricht von der Gestapo**')
    .setAuthor('Großdeutsches Reich', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Reichsadler_Deutsches_Reich_%281935%E2%80%931945%29.svg/220px-Reichsadler_Deutsches_Reich_%281935%E2%80%931945%29.svg.png', 'https://en.wikipedia.org/wiki/Nazi_Germany')
    .setDescription('Am 30. Januar 1933 zog ich in die Wilhelmstraße ein, erfüllt von tiefster Sorge für die Zukunft meines Volkes. Heute — sechs Jahre später — kann ich zu dem ersten Reichstag Großdeutschlands sprechen! Wahrlich, wir vermögen vielleicht mehr als eine andere Generation den frommen Sinn des Ausspruches zu ermessen: Welch eine Wendung durch Gottes Fügung!')
    .setThumbnail('https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/National_Socialist_swastika.svg/1200px-National_Socialist_swastika.svg.png')
    .setImage('https://cdn.britannica.com/58/129958-050-C3FE2DD2/Adolf-Hitler-1933.jpg')
    .setTimestamp()
    .setFooter('Großdeutsches Reich', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Reichsadler_Deutsches_Reich_%281935%E2%80%931945%29.svg/220px-Reichsadler_Deutsches_Reich_%281935%E2%80%931945%29.svg.png', 'https://en.wikipedia.org/wiki/Nazi_Germany')

    message.channel.send(helpEmbed);
    message.delete();
  }
}); 

client.login(process.env.token);