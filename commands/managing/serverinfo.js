const Command = require("../../core/command");
const moment = require("moment");

class ServerInfo extends Command {
    constructor(client) {
        super(client, {
            name: "server-info",
            description: "Get server infos",
            aliases: ["server", "info"]
        })
    }
}

run(msg) {
    msg.channel.send({embed: {
        color: 3447003,
        description: `Info on **${msg.guild.name}** (ID: ${msg.guild.id})`,
        fields: [{
            name: '-=- Channels',
            value: stripIndents`
                • ${msg.guild.channels.filter(ch => ch.type === 'text').size} Text, ${msg.guild.channels.filter(ch => ch.type === 'voice').size} Voice
                • Default: ${msg.guild.defaultChannel}
                • AFK: ${msg.guild.afkChannelID ? `<#${msg.guild.afkChannelID}> after ${msg.guild.afkTimeout / 60}min` : 'None.'}
            `,
        },
        {
            name: '-=- Member',
            value: stripIndents`
                • ${msg.guild.memberCount} members
                • Owner: ${msg.guild.owner.user.username}#${msg.guild.owner.user.discriminator}
            `,
        },
        {
            name: '-=- Other',
            value: stripIndents`

                • Region: ${msg.guild.region}
                • Created at: ${moment.utc(msg.guild.createdAt).format('dddd, MMMM Do YYYY, HH:mm:ss ZZ')}
            `
        }
        ],
        timestamp: new Date(),
        thumbnail: { url: msg.guild.iconURL }
    }});
}
module.exports = ServerInfo;