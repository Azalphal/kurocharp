const client = require("../../index");
const logger = require("./logger");
const { RichEmbed } = require("discord.js");
const config = require("../../config")

class util {
    constructor() { 
        throw new Error(`${this.constructor.name} cannot be initialized`);
    }

    static toUpper(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    static error(name,message,channel) {
        const embed = new RichEmbed()
            .setColor(config.colors.error)
            .addField("Module", name, true)
            .addField("Time", logger.time(), true)
            .addField("Message", message);

        channel = channel || null;
        logger.error(name, message);

        if (channel) channel.send({embed });
        return false;
    }
}

process.on("uncaughtException", error => 
    logger.error("Uncaught Exception", error, true));

module.exports = util;