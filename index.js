const { AoiClient, LoadCommands } = require("aoi.js");
const { AoiVoice, PlayerEvents, PluginName, Cacher, Filter } = require("@akarui/aoi.music");
const { Panel } = require("@akarui/aoi.panel");
const { InviteManager } = require("@akarui/aoi.invite");
require('dotenv').config();

const astrabot = new AoiClient({
  token: process.env.TOKEN,
  prefix: "$getGuildVar[prefix;$guildID;astrabot]",
  intents: ["MessageContent", "Guilds", "GuildMessages", "GuildVoiceStates"],
  events: ["onMessage", "onInteractionCreate"],
  database: {
    type: "aoi.db",
    db: require("@akarui/aoi.db"),
    dbType: "KeyValue",
    tables: ["astrabot", "blacklisting"],
    securityKey: process.env.DBKEY,
  }
});

const voice = new AoiVoice(astrabot, {
    searchOptions: {
        youtubegl: "US",
    },
    requestOptions: {
        offsetTimeout: 0,
        soundcloudLikeTrackLimit: 200,
    },
});

voice.addPlugin(PluginName.Cacher, new Cacher("memory"));

voice.addPlugin(
    PluginName.Filter,
    new Filter({
        filterFromStart: false,
    }),
);

voice.bindExecutor(astrabot.functionManager.interpreter);

const panel = new Panel({
  port: 3000,
  client: astrabot,
});

panel.loadAPI({
  auth: process.env.PNLAUTH,
});

panel.loadGUI({
  username: ["username1", "username 2"],
  password: ["Password1", "Password 2"],
});

new InviteManager(astrabot, {
    sk: process.env.INVAUTH,
}, ["inviteJoin", "inviteLeave"]);

const loader = new LoadCommands(astrabot);
// Carrega os comandos
const commandPaths = [
  "./commands/astrabot",
  "./commands/devs",
  "./commands/moderation",
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
