




const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibUorb3hBdHROOU9HbW5TVHhWYTlMdlVPWkxyWjgrMnJPTlVKUDUxVUlrQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOEpocCs2UFBkYVNIanB2eWpDbUxCckRKS1c1MDRMbWlpbVpFcmQrcXFGdz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIrT0hBMHF0OEhkMkJpN000NUhSUjAyeGRsUkEvM09xSUtmb2pwL0Fma0dnPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJzajE3bytpS05CVkg5M3lPTVFMNGwvWWlWejkra0k3M3JMZ2pzNDRxY25JPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImlJdkxndG44ZGp0RmFqSXVGYkJIQ3hEaVVDWDNXaDhHMW1jd3VtenZaRk09In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IllPU0NRRFowQ0pDSGE1SmhQV1NwOUUxa0U3UTFOS0JTakE0N29nbFhuM2M9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiS0xwODZEd3VmOXlkR2daQmdCVG9NWXplUittSWJ0OThGdEhLWkxGcTdtZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYU1MQVpMUDRCY2ZHTGZDdlQvMmhpSDRXNUdRejBmWjdFZFBYSmY4WGpWbz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjlsQURMOGFGcjA5U1RDUEZ3VTQvdmpSR21rTHl2VVg5a2tBeEMrZkRQd25DR1Q5R3BDeUxrN0VwL0VFa1FoSUtZSDJ2YW5rLy9RT1dGVW1VNVRMYmpBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NzgsImFkdlNlY3JldEtleSI6IjZlUHRMb1B0VC9zUVBaNmppUExhaU51TEd1dkxhWER2YlNmM3d2Y05EaE09IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiOTIzMTE0NjgwMzgxQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjU5MkE0NEFERjZEREQzQ0VCQUQwRjUzOUFBNzU4RkUwIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NTEwODQ4OTh9LHsia2V5Ijp7InJlbW90ZUppZCI6IjkyMzExNDY4MDM4MUBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiI5ODQ0QjM1QzhENkFBQTEwMUVFNzQxMTJGRDNFNDQxMCJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzUxMDg0OTA0fSx7ImtleSI6eyJyZW1vdGVKaWQiOiI5MjMxMTQ2ODAzODFAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiOTdDMzM1MjI5OThDNTk3MUNCNzJCODAxNEVDMEZEM0IifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc1MTA4NDk0MH1dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sInJlZ2lzdGVyZWQiOnRydWUsInBhaXJpbmdDb2RlIjoiUTRBRUE1M0QiLCJtZSI6eyJpZCI6IjkyMzExNDY4MDM4MToxN0BzLndoYXRzYXBwLm5ldCIsImxpZCI6IjIyMDQxODA3Mzk2MDUzMToxN0BsaWQiLCJuYW1lIjoiWmFpbiJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDSSt1bU5JQkVNN2UvY0lHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5Ijoib2dFd0NzSGdab2JBWmo3cVJNWENycXJuR1dmYTFOazcrbGNTMytLU0NDND0iLCJhY2NvdW50U2lnbmF0dXJlIjoiTzRzSDE4cHpWR3p1Smh5TFE3YVdTZU5NWER4K2ZMKzNRQWNSY3VlYzREblFEbkEzR2tyZHdkdGcrZjFlRnRQOGJQM3ErVldTcklUa0RWM0ljdVlPQlE9PSIsImRldmljZVNpZ25hdHVyZSI6IkVWOGRjeEszOUo1TE1NVWdyMVVSdVdibU9SOFU2OHFJTmNBT21iZXR3ZmFMWXFtYVZhUDRlZVM2THFmeE50Z1pKdUFSbngwb2Y1ZnZVdm9NVFdFZGpRPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiOTIzMTE0NjgwMzgxOjE3QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmFJQk1BckI0R2FHd0dZKzZrVEZ3cTZxNXhsbjJ0VFpPL3BYRXQvaWtnZ3UifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJyb3V0aW5nSW5mbyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNBSUlCUT09In0sImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc1MTA4NDg5MiwibGFzdFByb3BIYXNoIjoiM1I5WjM5IiwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFOeTgifQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "923114680381",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " Pkdriller01",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'NEXUS-AI',
    URL : process.env.BOT_MENU_LINKS || 'https://files.catbox.moe/g86c1n.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'yes',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ANTIDELETE1 : process.env.ANTI_DELETE_MESSAGE || 'no',
    ANTICALL : process.env.ANTICALL || 'no',
                  AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
                  AUTO_READ : process.env.AUTO_READ || 'no',
                  CHATBOT : process.env.CHATBOT || "yes",
                  AUTO_BIO : process.env.AUTO_BIO || "yes",
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
