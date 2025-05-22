const { AoiClient, LoadCommands } = require("aoi.js");
require('dotenv').config();

const astrabot = new AoiClient({
    token: process.env.TOKEN,
    prefix: "$getGuildVar[prefix;$guildID;astrabot]",
    intents: ["MessageContent", "Guilds", "GuildMessages", "GuildMembers", "GuildMessageReactions"],
    events: ["onMessage", "onInteractionCreate", "onJoin"],
    database: {
        type: "aoi.db",
        db: require("@aoijs/aoi.db"),
        dbType: "KeyValue",
        tables: ["economy", "astrabot", "moderation"],
        securityKey: process.env.DBKEY,
    }
});
const loader = new LoadCommands(astrabot);
// Carrega os comandos
const commandPaths = [
    "./commands/economy",
    "./commands/fun",
    "./commands/astrabot",
    "./commands/utility",
    "./commands/server",
    "./commands/moderation",
    "./commands/devs",
    "./commands/socials",
];

// Loop para carregar os comandos
commandPaths.forEach(path => loader.load(astrabot.cmd, path));

// Carrega as variáveis, status e callbacks
require("./handlers/variables.js")(astrabot);
require("./handlers/status.js")(astrabot);
require("./handlers/callbacks.js")(astrabot);

// ## Logs! ##

// Inicializando
console.log("\x1b[1m\x1b[34m\x1b[47mastra.bot \x1b[31m", process.env.VERSION, "\x1b[0m iniciando!");

// Inicialização concluída
astrabot.on("ready", () => {
    console.log("\x1b[1m\x1b[34m\x1b[47mastra.bot \x1b[31m", process.env.VERSION, "\x1b[0m acabou de iniciar!");
});