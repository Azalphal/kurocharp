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

//Core
const discord = require('discord.js');
const { error } = require("./core/util/util");
const config = require("./config.js");
const logger = require("./core/util/logger");
const commandManager = require("./core/commandManager");

//Bot itself
const client = new discord.Client();
const moment = require('moment');
const Manager = new commandManager(client);


client.on('ready', () => {
    logger.success(`
        Bot ready. Currently in:
        ${client.channels.size} Channels,
        ${client.guilds.size} Servers,
        With a ${client.users.size} total user.
        `);
});

client.on('ready', () => {
  client.user.setGame('IM A MORON!');
});

Manager.loadCommands("./commands/");

client.on("warn", warn => error("Core", warn));
client.on("error", err => error("Core", err));
client.on("message", message => Manager.handleMessage(message));
client.on("messageUpdate", (old, _new) => {
  if (old.content !== _new.content) Manager.handleMessage(_new);
});

module.exports = client;

client.login(process.env.TOKEN);