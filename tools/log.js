const fs = require("fs")
require("discord.js")

function memberLogs(guildObject) {
    const guild = guildObject;
    const member_data = [];
    guild.members.cache.forEach((member) => {
        let member_nick = (member.nickname === null) ? "No nickname" : member.nickname
        console.log(`Loged Member: [${member.displayName + "#" + member.user.discriminator + " / " + member.id + " / aka: " + member_nick}]`)
        member_data.push({
            member_name: member.displayName + "#" + member.user.discriminator,
            member_username: member.displayName,
            member_discriminator: "#" + member.user.discriminator,
            member_nickname: member_nick,
            member_id: member.id,
            member_joined_at: member.joinedAt,
            member_avatar: member.displayAvatarURL(),
        });
    });
    const jsonData = JSON.stringify(member_data, null, 2);
    fs.writeFile(
        "./serverLogs/" + guild.name + "_members.json",
        jsonData,
        (err) => {
            if (err) {
                console.error(err);
                return;
            }
        }
    );
}

function channelLogs(guildObject) {
    const guild = guildObject;
    const channel_data = [];
    guild.channels.cache.forEach((channel) => {
        let type = (channel.type === 0) ? "textchat" : (channel.type === 2) ? "voicechat" : (channel.type === 4) ? "category" : null;
        console.log(`Loged Channel: [${channel.name + " / " + type + " / " + channel.id}]`)
        channel_data.push({
            channel_name: channel.name,
            channel_id: channel.id,
            channel_editable: channel.editable,
            channel_deletable: channel.deletable,
            channel_createdAt: channel.createdAt,
            channel_type: type,
        });
    }) 
    const jsonData = JSON.stringify(channel_data, null, 2);
    fs.writeFile(
        "./serverLogs/" + guild.name + "_channels.json",
        jsonData,
        (err) => {
            if (err) {
                console.error(err);
                return;
            }
        }
    );
}

module.exports = {
    memberLogs: memberLogs,
    channelLogs: channelLogs
};