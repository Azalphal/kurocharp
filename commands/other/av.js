const Command = require("../../core/command");

class av extends Command {
    constructor(client) {
        super(client, {
            name: "av",
            description: "Show the beautiful ~~or not~~ avatar of someone.",
            aliases: ["avatar"]
        });
    }

    async run(client, message) {
        let target = message.mention.users.size === 0 ? message.author : message.guild.member(message.mentions.users.first()).user;
        message.channel.send(targer.avatarURL);
    }
}
module.exports = av;