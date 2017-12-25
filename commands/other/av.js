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

    async run (client, channel, message) {
        message.channel.send(message.author.avatarURL);
    }
    /*async run(client, message) {
        let target = message.mention.users.size === 0 ? message.author : message.guild.member(message.mentions.users.first()).user;
        message.channel.send(target.avatarURL);
    }*/
}
module.exports = av;