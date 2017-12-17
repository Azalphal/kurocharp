const Command = require("../../core/command");
const toLower = require("../../core/util/util");

class roleCommand extends Command {
    constructor(client) {
        super(client, {
            name: "role",
            description: "Give the user a role in the <#392046551179984896> channel.",
            aliases: ["roles"]
        });
    }

    async run(message, channel, user, args) {
        if (message.channel.id !== "392046551179984896") {
            message.delete();
            return;
        }

        const roles = args;
        console.log(args)
        var SAroles = new SAroles['red', 'green', 'yellow', 'blue', 'pink', 'purple', 'orange']
        if (SAroles.indexOf(roles.toLower()) > -1) {
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