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

run(message) {
    message.channel.send({embed: {
        color: 3447003,
        description: `Info on **${message.guild.name}** (ID: ${message.guild.id})`,
        fields: [{
            name: '-=- Channels',
            value: `
                • ${message.guild.channels.filter(ch => ch.type === 'text').size} Text, ${message.guild.channels.filter(ch => ch.type === 'voice').size} Voice
                • Default: ${message.guild.defaultChannel}
                • AFK: ${message.guild.afkChannelID ? `<#${message.guild.afkChannelID}> after ${message.guild.afkTimeout / 60}min` : 'None.'}
            `,
        },
        {
            name: '-=- Member',
            value: `
                • ${message.guild.memberCount} members
                • Owner: ${message.guild.owner.user.username}#${message.guild.owner.user.discriminator}
            `,
        },
        {
            name: '-=- Other',
            value: `

                • Region: ${message.guild.region}
                • Created at: ${moment.utc(message.guild.createdAt).format('dddd, MMMM Do YYYY, HH:mm:ss ZZ')}
            `
        }
        ],
        timestamp: new Date(),
        thumbnail: { url: message.guild.iconURL }
    }});
}}
module.exports = ServerInfo;