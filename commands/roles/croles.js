const Command = require("../../core/command");
const toLower = require("../../core/util/util");

class croleCommand extends Command {
    constructor(client) {
        super(client, {
            name: "clear",
            aliases: ["clearrole", "clearole", "crole", "clear"],
            description: 'Remove a color role to the user',
        });
    }
    async run(message, args) {
        if (message.channel.id !== "391873430229745664") {
            message.delete();
            return;
        }

        const clears = args;
        console.log(args)
        var clearlist = ['red', 'green', 'yellow', 'blue', 'pink', 'purple', 'orange', 'male', 'female']
        if (clearlist.indexOf(clears.toLower()) > -1) {
            message.guild.roles.forEach(role => {
                if (role.name == clears) {
                    message.member.removeRole(role).catch(console.error);
                    return;
                }
            });
        }
    }
}
module.exports = croleCommand;