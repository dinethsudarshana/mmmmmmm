/*
░█████╗░░█████╗░██████╗░██████╗░░█████╗░░░░░░░███╗░░░███╗██████╗░
██╔══██╗██╔══██╗██╔══██╗██╔══██╗██╔══██╗░░░░░░████╗░████║██╔══██╗
██║░░╚═╝██║░░██║██████╦╝██████╔╝███████║█████╗██╔████╔██║██║░░██║
██║░░██╗██║░░██║██╔══██╗██╔══██╗██╔══██║╚════╝██║╚██╔╝██║██║░░██║
╚█████╔╝╚█████╔╝██████╦╝██║░░██║██║░░██║░░░░░░██║░╚═╝░██║██████╔╝
░╚════╝░░╚════╝░╚═════╝░╚═╝░░╚═╝╚═╝░░╚═╝░░░░░░╚═╝░░░░░╚═╝╚═════╝░ BY SISULA WELGAMAGE

Coded By  Sisula welgamage | 2022/08/08 Main Release | Docker Image : sisula/whatsapp_bot | Host: AWS(Heroku) OR etc. | Terminal: Node 
*/

const {ytinfo} =  require('../lib/ytinfo')
//const {yta, servers} = require('../lib/y2mate_dl')
const {addCMD} = require('cobra-event-emit').events;

addCMD({  pattern: 'song ?(.*)', 
            desc: '', 
            fromMe: true, 
            onlyGroup: false}, (async (message,  match) => {
    await message.client.sendMessage(message.jid, {text: match})            
    if (match === "" || match === " " || match === undefined) return await message.client.sendMessage(message.jid, {text: "*🧜‍♀️💬ENTER A SONG NAME*\nex : .song faded"}, {quoted: message.data})         
    let ytmsg = await ytinfo(match)           
    if (!ytmsg.thumbnail) {
    await message.client.sendMessage(message.jid , { text: "*SONG NOT FOUND‼️*" }, { quoted: message.data } )
    } else {
    const songbuttons = [
    {buttonId: '.dsong ' + ytmsg.yuturl, buttonText: {displayText: '📂 DOCUMENT'}, type: 1},
    {buttonId: '.asong ' + ytmsg.yuturl, buttonText: {displayText: '🎧 AUDIO'}, type: 1},
    ]
    await message.client.sendMessage(message.jid, { image: {url: ytmsg.thumbnail  }, caption: ytmsg.songmsg , footer: 'config.FOOTER' , buttons: songbuttons , headerType: 4} , { quoted: message.data } )				
}

}))
/*

addCMD({  pattern: 'dsong ?(.*)', 
            desc: '', 
            fromMe: false, 
            onlyGroup: false}, (async (message,  match) => {
    await message.client.sendMessage(message.jid, {text: match})
    let { dl_link, thumb, title, filesize, filesizeF} = await yta(match)
    await message.client.sendMessage(message.jid, {document: {url: dl_link}}, {quoted: message.data})

}))
*/
