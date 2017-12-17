const Command = require('discord.js');

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
            msg.delete();
            return;
        }

        const clears = args;
        console.log(args)
        var clearlist = ['red', 'green', 'yellow', 'blue', 'pink', 'purple', 'orange']
        if (clearlist.indexOf(clears.toLowerCase()) > -1) {
            message.guild.roles.forEach(role => {
                if (role.name == clears) {
                    message.member.removeRole(role).catch(console.error);
                    return;
                }
            });
        }
    }
};
module.exports = croleCommand;