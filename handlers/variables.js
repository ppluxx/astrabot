require('dotenv').config();
module.exports = (astrabot)=>{
    astrabot.variables({
        version: process.env.VERSION,
        prefix: "a.",

        isBlacklisted: false,
        blacklistReason: "Não especificado.",
        blacklistDate: "Erro ao obter.",
        blacklistAuthor: "Erro ao obter."
    });
};