const Command = require("../../core/command");

class Ping extends Command {
    constructor(client) {
        super(client, {
            name: "Ping",
            description: "Test the Connection to the bot.",
            aliases: []
        });
    }

    async run(message, channel) {
        channel.send(`Pong! \`${Date.now() - message.createdTimestamp} ms\``);
    }
}

module.exports = Ping;