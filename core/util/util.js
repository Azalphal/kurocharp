const client = require("../../index");
const Logger = require("./Logger");
const { RichEmbed } = require("discord.js");
const settings = require("../../psettings")

class util {
    constructor() { 
        throw new Error(`${this.constructor.name} cannot be initialized`);
    }

    static toUpper(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    static error(name,message,channel) {
        const embed = new RichEmbed()
            .setColor(settings.colours.error)
    }
}