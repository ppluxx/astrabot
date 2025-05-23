module.exports = {
    name: "ping",
    code: `
    $title[🏓 | Pong!]
    $addField[Tempo ligado:;\`\`\`$uptime[humanize]\`\`\`;true]
    $addField[Latência do bot:;\`\`\`$pingms\`\`\`;true]
    $footer[Utilize $getGuildVar[prefix;$guildID;astrabot]botinfo para mais informações.]
    $reply
    $onlyIf[$getGlobalUserVar[isBlacklisted;$authorID;blacklisting]==false;{reply:$messageID:true}{newEmbed:{title:🚫 | Você está banido do astra.bot}, {description:- **Motivo:** $getGlobalUserVar[blacklistReason;$authorID;blacklisting]\n- **Data e hora do banimento:** $getGlobalUserVar[blacklistDate;$authorID;blacklisting]\n- **Autor do banimento:** $getGlobalUserVar[blacklistAuthor;$authorID;blacklisting]}, {footer:Caso ache que este banimento foi um engano, ou quer revê-lo, entre em meu servidor utilizando o botão abaixo.}, {color:FF6B6B}}{actionRow:{button:Suporte:link:https://discord.gg/invite/Zuy7sFdjTd/:false:🎧}}]
    `
};