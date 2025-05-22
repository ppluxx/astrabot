require('dotenv').config();
module.exports = (astrabot)=>{
    astrabot.variables({
        prefix: "a.",
        version: process.env.VERSION,
    }, "astrabot");
};