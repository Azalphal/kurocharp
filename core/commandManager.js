const fs = require("fs");
const path = require("path");
const config = require("../config");
const Logger = require("./Util/Logger");
const { error, toUpper } = require("./Util/Util");
const { Collection, RichEmbed, Client } = require("discord.js");

module.exports = class CommandManager {
    constructor(client) {
        this.client = client;
        this.commands = new Collection();
        this.aliases = new Collection();

        if (!this.client || !(this.client instanceof Client)) {
            throw new Error("Discord Client is required");
        }
    }

    loadCommands(directory) {
        const folders = fs.readdirSync(path.join(__dirname, "..", directory));

        for (const folder of folders) {
            const location = path.join(__dirname, "..", directory, folder);
            if (!fs.statSync(location).isDirectory()) continue;
            const files = fs.readdirSync(location);

            for (const file of files) {
                if (path.extname(file) !== ".js") continue;

                const location = path.join(__dirname, "..", directory, folder, file);

                this.startModule(location);
            }
        }
    }

    startModule(location, re) {
        const Command = require(location);
        const instance = new Command(this.client);
        const commandName = instance.name.toLowerCase();
        instance.location = location;

        if (instance.disabled) return;
        if (this.commands.has(commandName)) {
            Logger.error("Start Module", `"${commandName}" already exists!`);
            throw new Error("Commands cannot have the same name");
        }

        Logger.info(`${re ? "Reloaded" : "Loaded"} Command`, toUpper(commandName));
        this.commands.set(commandName, instance);

        for (const alias of instance.aliases) {
            if (this.aliases.has(alias)) {
                throw new Error(`Commands cannot share aliases: ${instance.name} has ${alias}`);
            } else {
                this.aliases.set(alias, instance);
            }
        }
    }

    reloadCommand(commandName) {
        const existingCommand = this.commands.get(commandName) || this.aliases.get(commandName);
        if (!existingCommand) return false;
        const location = existingCommand.location;
        for (const alias of existingCommand.aliases) this.aliases.delete(alias);
        this.commands.delete(commandName);
        delete require.cache[require.resolve(location)];
        this.startModule(location, true);
        return true;
    }

    runCommand(command, message, channel, user, args) {
        try {
            Logger.warn("Command Parser", `Matched ${command.name}, Running...`);
            return command.run(message, channel, user, args);
        } catch(err) {
            return error("Command", err);
        }
    }

    findCommand(mentioned, args) {
        const commandName = mentioned && args.length > 0
            ? args.splice(0, 2)[1].toLowerCase()
            : args.splice(0, 1)[0].slice(config.prefix.length).toLowerCase();
        const command = this.commands.get(commandName) || this.aliases.get(commandName);
        return { command, commandName };
    };

    async handleMessage(message) {
        // Don't Parse Bot Messages
        if (message.author.bot) return false;

        // Handle Server Configuration
        const { prefix } = await this.handleServer(message.guild);

        // Create Helper Variables
        let text = message.cleanContent;
        let args = message.content.split(" ");
        const channel = message.channel;
        const server = message.guild ? message.guild.name : "DM";
        const user = message.author;
        const attachments = message.attachments.size > 0;
        const pattern = new RegExp(`<@!?${this.client.user.id}>`, "i");
        const mentioned = message.isMentioned(this.client.user) && pattern.test(args[0]);
        const triggered = message.content.startsWith(prefix);

        // Find Command
        const instance = this.findCommand(mentioned, args);
        const command = instance.command;

        // Set Variables
        message.context = this;
        message.command = instance.commandName;
        message.prefix = prefix;
        message.pung = [];
        user.nickname = message.member ? message.member.displayName : message.author.username;

        // Check for Pinged user
        for (let index = 0; index < args.length; index++) {
            const userMatched = /<@!?([0-9]+)>/g.exec(args[index]);

            if (userMatched && userMatched.length > 1) {
                message.pung.push(message.guild.members.get(userMatched[1]));
                args.splice(index, 1);
            }
        }

        // Command doesn't exist
        if (!command) return false;

        // Check if Command requires Admin
        if (command.admin && !config.admin.includes(user.id)) return false;

        // Log Message
        Logger.warn("Chat Log", `<${user.username}#${user.discriminator}>: ${text}`);

        // Run Command
        return this.runCommand(command, message, channel, user, args);
    }

    getAdministrators(guild) {
        let owners = "";

        for (const member of guild.members.values()) {
            if (member.hasPermission("ADMINISTRATOR")) {
                owners = owners === "" ? member.user.id : `${owners},${member.user.id}`;
            }
        }

        return owners;
    };

    async handleServer(guild) {
        if (!guild) return { prefix: config.prefix };

        const id = guild.id;
        const owners = this.getAdministrators(guild);
        const prefix = config.prefix;
        return { prefix };
    };
};