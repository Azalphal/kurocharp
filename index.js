const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

const discord = require('discord.js');
const client = new discord.Client();
const settings = require('./settings.json');

client.on('ready', () => {
    console.log(`
        Bot ready. Currently in:
        ${client.channels.size} Channels,
        ${client.guilds.size} Servers,
        With a ${client.users.size} total user.
        `)
  });

  const prefix = ">";
  client.on("message", (message) => {
    if (!message.content.indexOf(prefix) !== 0 || message.author.bot) return;
  
    if (message.content.startsWith(prefix + "ping")) {
      message.channel.send(`Pong! \`${Date.now() - message.createdTimestamp} ms\``);
    }
});

client.login(config.token);