const Command = require("../../core/command");

class croleCommand extends Command {
    constructor(client) {
        super(client, {
            name: "clear",
            aliases: ["clearrole", "clearole", "crole", "clear"],
            description: 'Remove a color role to the user',
        });
    }
    async run(message, channel, user, args) {
        if (message.channel.id !== "392418727532036107") {
            console.log(`${message.author.username} tried to run crole command in ${channel.name} but failed.`);
            message.delete();
            console.log(args);
            return;
        }

        var clearlist = ['red', 'green', 'yellow', 'blue', 'pink', 'purple', 'orange', 'gamer', 'role play', 'not looking', 'taken', 'single', 'male', 'female', 'trans', 'bisexual', 'straight', '15-17', '10-14'];
        const clears = args;
        var cclears = clears[0].toLowerCase();
        console.log(clears, `${message.author.username} ran crole command in ${channel.name} to clear role`, clears)
        message.delete(`${message.author.username} ran crole command in ${channel.name}`);
        if (!clearlist.includes(cclears));
        try {
            message.member.removeRole(message.guild.roles.find("name", cclears));
        } catch(error) {
            return;
        };
    }
}
module.exports = croleCommand;