




const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQUZMek96OHlKV3BGRlZFWXR0cFhhMjB4M0FtM3FucnU4czlRcVJ2YlVHbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWjhJVlJ4TnlvaGN4ZklTdkFrRkpwLzJxcmFYNml4SU1RR04ya0NHMHBWWT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJrUHcwSm4vanpzQ0hrbHUrVmNrZDBoRmFQd0VnTS9qRlpjdGIyajh0RDFVPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI0UXRIU2YxUWt1eUxCVVFIM3RYRFFwV3FUWTlVZXJxV3Y4c2lmZWZuQmtVPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IktEMUV5N3U3TW9UNVROL2NzdFB2TTdVeEpGL0xCSnNmU0t4c29LZWlxVU09In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjJuMWlsN2c2SkszbVM1aTF1WjlRbnYwMmYwOXRQN1ZBY2ZUakI1TFF4enc9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieVB4eDFPMEFtblNxRloxL2haY08rN091d0ZOeUNRU1o5dFdnYzZERTZsTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYzlLWkZSRDJIR0U3blRLZ2lwRm4rb3RZTmZaZDRqbnFkWVhzOUMxcjhqZz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IitNSmI4dHlpK2ZvL05kMnF6VndWNkNTdjc2R01xUm5NZFAzUGZFSHkzQ1M0ajNHT2tMSnFLZU1vaG5MUFJ1WmV3SElob3dyWkdkaVBpOGcvcDFJcmpRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTg2LCJhZHZTZWNyZXRLZXkiOiJSSEViWUxDdGl3RFljQmhaRGc2V0ZKdEF1VFYyRXFiZ09oTUZDeFluejNBPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjI1NTYyOTIyNjAwN0BzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiI4MTdDMkU1NjZFRUI3QTIxNThBMjJBNjNBNTQ2MTk3NyJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzUyMDQ3ODYzfSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyNTU2MjkyMjYwMDdAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiMUEwQ0M0RkE2NDc5Nzc0OEIwQkNDQjdGNDQ2RTkzRTQifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc1MjA0Nzg4N31dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sInJlZ2lzdGVyZWQiOnRydWUsInBhaXJpbmdDb2RlIjoiOFBMTjZaTFEiLCJtZSI6eyJpZCI6IjI1NTYyOTIyNjAwNzo3NkBzLndoYXRzYXBwLm5ldCIsImxpZCI6IjEyNzQ3MDg3MTMwMjM0NDo3NkBsaWQiLCJuYW1lIjoiTVdMLiBNQUpFTlpJIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNKMlM1ZFVCRU9MQnVNTUdHQUVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJOWExINTVDOTVEbE1XVlNZaGVGUDMwZFhKTGZnVk9KL0tHWWFwMWJSRG5zPSIsImFjY291bnRTaWduYXR1cmUiOiJRUmdncENJSkF2WkQ3and6d2tvZW8rcE5YakRIcHg2RzBCTWswNm16bFpxa2hhaTdpdlU0RnpsRE9INnpjRWNnZTdZTVhRZTJpY2tJVktmaHFiclFEQT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiVHVreXduenk2RDFiVW9CSmsra043WXZrUW1sR1E0Y1ZiR3dnTGRodzMrZTcxZWhOeDZzZGEwN2tMZ2xzWitSVUEzYUpQejQybXF3cTFFN2JURkxSaXc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyNTU2MjkyMjYwMDc6NzZAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCVFZ5eCtlUXZlUTVURmxVbUlYaFQ5OUhWeVMzNEZUaWZ5aG1HcWRXMFE1NyJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0FJSUJRPT0ifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzUyMDQ3ODU2LCJsYXN0UHJvcEhhc2giOiIzZ1BVSmsiLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQU4xWCJ9',
    PREFIXE: process.env.PREFIX || "+",
    OWNER_NAME: process.env.OWNER_NAME || "MAJENZI",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "255629226007",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'NEXUS-AI',
    URL : process.env.BOT_MENU_LINKS || 'https://files.catbox.moe/g86c1n.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '1' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "no",
    ANTIDELETE1 : process.env.ANTI_DELETE_MESSAGE || 'no',
    ANTICALL : process.env.ANTICALL || 'no',
                  AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'no',
                  AUTO_READ : process.env.AUTO_READ || 'no',
                  CHATBOT : process.env.CHATBOT || "no",
                  AUTO_BIO : process.env.AUTO_BIO || "no",
                  AUTO_REACT : process.env.AUTO_REACT || "no",
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
