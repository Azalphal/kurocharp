const Command = require("../../core/command");
const toLower = require("../../core/util/util");

class roleCommand extends Command {
    constructor(client) {
        super(client, {
            name: "role",
            description: "Give the user a role.",
            aliases: ["roles"]
        });
    }

    async run(message, channel, user, args) {
        if (message.channel.id !== "392046551179984896") {
            console.log(`${message.author.username} tried to run role command in ${channel.name}`);
            console.log(args);
            return;
        }
        var SAroles = ['red', 'green', 'yellow', 'blue', 'pink', 'purple', 'orange'];
        let [red, green, yellow, blue, pink, purple, orange] = SAroles;
        const roles = args;
        console.log(args)
        if (SAroles.isArray(roles.toLower()) > -1) {
            message.guild.roles.forEach(role => {
                if (role.name == roles.toLower()) {
                    message.member.addRole(role).catch(console.error);
                    return;
                }
            });
        }
    }
}
module.exports = roleCommand;