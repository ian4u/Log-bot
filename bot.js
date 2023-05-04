const { Client , GatewayIntentBits} = require('discord.js')
const fs = require("fs")
const bot_setup = require("./tools/bot_setup.json")

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
    const guild = msg.guild
    if(bot_setup.ServerLogs == true && !fs.existsSync("./serverLogs/"+guild.name+"_channels.json")) {
        guild.channels.cache.forEach(channel => {
            if(channel.type == 4) return
            const channel_data = {
                channel_name: channel.name,
                channel_id: channel.id,
                channel_editable: channel.editable,
                channel_deletabel: channel.deletable,
                channel_createdAt: channel.createdAt,
                channel_type: channel.type
            }
            const jsonData = JSON.stringify(channel_data, null, 2);
            fs.appendFile("./serverLogs/"+guild.name+"_channels.json", jsonData, (err) => {
                if (err) {
                  console.error(err);
                  return;
                }
            })
        })
    }
    if(bot_setup.ServerLogs == true && !fs.existsSync("./serverLogs/"+guild.name+"_members.json")) {
        guild.members.cache.forEach(member => {
            const member_data = {
                member_name: member.displayName+"#"+member.user.discriminator,
                member_username: member.displayName,
                member_discriminator: "#"+member.user.discriminator,
                member_nickname: member.nickname,
                member_id: member.id,
                member_joined_at: member.joinedAt,
                member_avatar: member.displayAvatarURL()
            }
            const jsonData = JSON.stringify(member_data, null, 2);
            fs.appendFile("./serverLogs/"+guild.name+"_members.json", jsonData, (err) => {
                if (err) {
                  console.error(err);
                  return;
                }
            })
        })
    }
})
try {
    client.login(bot_setup.BotToken)
} catch(err) {
    console.log("Add a token to ./tools/bot_setup.json or look that all intens are on ;D")
}