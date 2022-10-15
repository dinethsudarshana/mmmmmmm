/*
░█████╗░░█████╗░██████╗░██████╗░░█████╗░░░░░░░███╗░░░███╗██████╗░
██╔══██╗██╔══██╗██╔══██╗██╔══██╗██╔══██╗░░░░░░████╗░████║██╔══██╗
██║░░╚═╝██║░░██║██████╦╝██████╔╝███████║█████╗██╔████╔██║██║░░██║
██║░░██╗██║░░██║██╔══██╗██╔══██╗██╔══██║╚════╝██║╚██╔╝██║██║░░██║
╚█████╔╝╚█████╔╝██████╦╝██║░░██║██║░░██║░░░░░░██║░╚═╝░██║██████╔╝
░╚════╝░░╚════╝░╚═════╝░╚═╝░░╚═╝╚═╝░░╚═╝░░░░░░╚═╝░░░░░╚═╝╚═════╝░ BY SISULA WELGAMAGE

Coded By  Sisula welgamage | 2022/08/08 Main Release | Docker Image : sisula/whatsapp_bot | Host: AWS(Heroku) OR etc. | Terminal: Node 
*/
const { Sequelize } = require('sequelize');
const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}

DATABASE_URL = process.env.DATABASE_URL === undefined ? './cobramain.db' : process.env.DATABASE_URL;
DEBUG = process.env.DEBUG === undefined ? false : convertToBool(process.env.DEBUG);

module.exports = {
    VERSION: 'v1.0-beta dev',
    CHANNEL: 'https://t.me/',
    GANSTYLE: process.env.GAN_IMAGE === undefined ? 'https://i.hizliresim.com/loUtAb.jpg' : process.env.GAN_IMAGE,
    LANG: process.env.LANGUAGE === undefined ? 'EN' : process.env.LANGUAGE.toUpperCase(),
    ALIVEMSG: process.env.ALIVE_MESSAGE === undefined ? 'default' : process.env.ALIVE_MESSAGE,
    ALIVE_LOGO: process.env.ALIVE_LOGO === undefined ? 'https://i.hizliresim.com/9tg3x8j.jpg' : process.env.ALIVE_LOGO,
    WELCOME_GIF: process.env.WELCOME_GIF === undefined ? 'https://telegra.ph/file/dad5ef6acdf755b35bda1.mp4' : process.env.WELCOME_GIF,
    BYE_GIF: process.env.BYE_GIF === undefined ? 'https://telegra.ph/file/5850ee81491205afc2140.mp4' : process.env.BYE_GIF,
    SONG_DOWN: process.env.SONG_DOWN === undefined ? '*♦️ ඔබේ ගීතය Download කරමින් පවතී...*' : process.env.SONG_DOWN,
    SONG_UP: process.env.SONG_UP === undefined ? '*♦️ ඔබේ ගීතය Upload කරමින් පවතී...*' : process.env.SONG_UP,
    VIDEO_DOWN: process.env.VIDEO_DOWN === undefined ? '*♦️ ඔබේ වීඩියෝව Download කරමින් පවතී...*' : process.env.VIDEO_DOWN,
    VIDEO_UP: process.env.VIDEO_UP === undefined ? '*♦️ ඔබේ වීඩියෝව Upload කරමින් පවතී...*' : process.env.VIDEO_UP,
    CAPTION_MSG: process.env.CAPTION_MSG === undefined ? 'copyright (c) 2021 cobrabot' : process.env.CAPTION_MSG,
    KICKMEMSG: process.env.KICKME_MESSAGE === undefined ? 'default' : process.env.KICKME_MESSAGE,
    BLOCKCHAT: process.env.BLOCK_CHAT === undefined ? false : process.env.BLOCK_CHAT,
    GREETING_TYPE: process.env.GREETING_TYPE === undefined ? 'IMG' : process.env.GREETING_TYPE,
    ADDMSG: process.env.ADD_MESSAGE === undefined ? 'default' : process.env.ADD_MESSAGE,
    MUTEMSG: process.env.MUTE_MESSAGE === undefined ? 'default' : process.env.MUTE_MESSAGE,
    NOLOG: process.env.NO_LOG === undefined ? 'false' : process.env.NO_LOG,
    FULLEVA: process.env.FULL_EVA === undefined ? 'false' : process.env.FULL_EVA,
    BLOCKMSG: process.env.BLOCK_MESSAGE === undefined ? 'default' : process.env.BLOCK_MESSAGE,
    UNBLOCKMSG: process.env.UNBLOCK_MESSAGE === undefined ? 'default' : process.env.UNBLOCK_MESSAGE,
    UNMUTEMSG: process.env.UNMUTE_MESSAGE === undefined ? 'default' : process.env.UNMUTE_MESSAGE,
    WORKTYPE: process.env.WORK_TYPE === undefined ? 'private' : process.env.WORK_TYPE,
    PROMOTEMSG: process.env.PROMOTE_MESSAGE === undefined ? 'default' : process.env.PROMOTE_MESSAGE,
    DEMOTEMSG: process.env.DEMOTE_MESSAGE === undefined ? 'default' : process.env.DEMOTE_MESSAGE,
    BANMSG: process.env.BAN_MESSAGE === undefined ? 'default' : process.env.BAN_MESSAGE,
    AFKMSG: process.env.AFK_MESSAGE === undefined ? 'default' : process.env.AFK_MESSAGE,
    HANDLERS: process.env.HANDLERS === undefined ? '^[.!;]' : process.env.HANDLERS,
    SEND_READ: process.env.SEND_READ === undefined ? false : convertToBool(process.env.SEND_READ),
    BRANCH: 'master',
    HEROKU: {
        HEROKU: process.env.HEROKU === undefined ? false : convertToBool(process.env.HEROKU),
        API_KEY: process.env.HEROKU_API_KEY === undefined ? '' : process.env.HEROKU_API_KEY,
        APP_NAME: process.env.HEROKU_APP_NAME === undefined ? '' : process.env.HEROKU_APP_NAME
    },
    DATABASE_URL: DATABASE_URL,
    DATABASE: DATABASE_URL === './cobramain.db' ? new Sequelize({ dialect: "sqlite", storage: DATABASE_URL, logging: DEBUG }) : new Sequelize(DATABASE_URL, { dialectOptions: { ssl: { require: true, rejectUnauthorized: false } }, logging: DEBUG }),
    RBG_API_KEY: process.env.REMOVE_BG_API_KEY === undefined ? false : process.env.REMOVE_BG_API_KEY,
    NO_ONLINE: process.env.NO_ONLINE === undefined ? true : convertToBool(process.env.NO_ONLINE),
    SUDO: process.env.SUDO === undefined ? false : process.env.SUDO,
    DEBUG: DEBUG,
    SUPPORT: "393475528094-1415817281",
    SUPPORT2: "96176912958-1458298055",
    SUPPORT3: "393472769604-1446476993",
    OWN: "94766239744,0"
};