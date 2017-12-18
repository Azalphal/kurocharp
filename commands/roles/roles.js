const Command = require("../../core/command");

class roleCommand extends Command {
    constructor(client) {
        super(client, {
            name: "role",
            description: "Give the user a role.",
            aliases: ["roles"]
        });
    }

    async run(message, channel, user, args) {
        if (message.channel.id !== "392418727532036107") {
            console.log(`${message.author.username} tried to run role command in ${channel.name} but failed.`);
            message.delete();
            console.log(args);
            return;
        }
        var SAroles = ['red', 'green', 'yellow', 'blue', 'pink', 'purple', 'orange', 'gamer', 'role play', 'not looking', 'taken', 'single', 'male', 'female', 'trans', 'bisexual', 'straight', '15-17', '10-14'];
        const roles = args;
        let rroles = roles[0].toLowerCase();
        console.log(roles, `${message.author.username} ran role command in ${channel.name} to get role`, roles)
        message.delete(`${message.author.username} ran role command in ${channel.name}`);
        if (!SAroles.includes(rroles));
        try {
            message.member.addRole(message.guild.roles.find("name", rroles));
        } catch(error) {
            return;
        };
    }
}
module.exports = roleCommand;