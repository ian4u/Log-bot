const { Client , GatewayIntentBits } = require('discord.js')
const bot_setup = require("./tools/bot_setup.json")
const in_log = require("./tools/log.js");

const client = new Client({
    intents:[
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ],
})

client.on("ready", () => {
    console.log("Bot is up");
});

client.on("messageCreate", msg => {
    if(bot_setup.ServerLogs.Channellogs == true) {
        in_log.channelLogs(msg.guild)
    }
    if(bot_setup.ServerLogs.Memberlogs == true) {
        in_log.memberLogs(msg.guild)
    }
})
try {
    client.login(bot_setup.BotToken)
} catch(err) {
    console.log("Add a token to ./tools/bot_setup.json or look that all intens are on ;D")
}