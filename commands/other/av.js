const Command = require("../../core/command");
const config = require("../../config");

class av extends Command {
    constructor(client) {
        super(client, {
            name: "av",
            description: "Show the beautiful ~~or not~~ avatar of someone.",
            aliases: ["avatar", "avi"]
        });
    }

    async run (client, message) {
        message.send(client.author.avatarURL);
    }
}
module.exports = av;