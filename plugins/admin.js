const {addCMD} = require('cobra-event-emit').events;
/*
░█████╗░░█████╗░██████╗░██████╗░░█████╗░░░░░░░███╗░░░███╗██████╗░
██╔══██╗██╔══██╗██╔══██╗██╔══██╗██╔══██╗░░░░░░████╗░████║██╔══██╗
██║░░╚═╝██║░░██║██████╦╝██████╔╝███████║█████╗██╔████╔██║██║░░██║
██║░░██╗██║░░██║██╔══██╗██╔══██╗██╔══██║╚════╝██║╚██╔╝██║██║░░██║
╚█████╔╝╚█████╔╝██████╦╝██║░░██║██║░░██║░░░░░░██║░╚═╝░██║██████╔╝
░╚════╝░░╚════╝░╚═════╝░╚═╝░░╚═╝╚═╝░░╚═╝░░░░░░╚═╝░░░░░╚═╝╚═════╝░ BY SISULA WELGAMAGE

Coded By  Sisula welgamage | 2022/08/08 Main Release | Docker Image : sisula/whatsapp_bot | Host: AWS(Heroku) OR etc. | Terminal: Node 
*/
const Language = require('../language');
const Lang = Language.getString('admin');
const  config =  require('../config')
const fs = require('fs');


var wk = []; if (config.WORKTYPE === 'private' || config.WORKTYPE === 'Private'){ wk = true } else if (config.WORKTYPE === 'public' || config.WORKTYPE === 'Public') {wk = false} else {return}

// Admin's Command List | Code Owner Sisula Welgamage | 2022/08/28 -dev*

addCMD({  pattern: 'kick$', 
            desc: '', 
            fromMe: true, 
            onlyGroup: true}, (async (message,  match) => {

if (!message.grpadmin) return await message.client.sendMessage(message.jid, {text: Lang.IM_NOT_ADMIN}, {quoted: message.data})
if (message.mentionJid === undefined) return await message.client.sendMessage(message.jid, {text: Lang.GIVE_ME_USER}, {quoted: message.data})
if (message.grpadminList.includes(message.mentionJid)) return message.client.sendMessage(message.jid , { text: Lang.ADMIN_USER }, { quoted: message.data } )

const msg  =  await message.client.sendMessage(message.jid , { text: '@' + message.mentionJid.split('@')[0] + ' , ```' + Lang.BANNED + '```', mentions: [message.mentionJid] }, { quoted: message.data } )
await message.client.sendMessage(message.jid, { react: {  text: "✅", key: msg.key } } )
await message.client.groupParticipantsUpdate(message.jid, [message.mentionJid] ,"remove" )

}))

addCMD({  pattern: 'add ?(.*)', 
            desc: '', 
            fromMe: true, 
            onlyGroup: true}, (async (message,  match) => {

if (match === '94766239744' || match === '0766239744' || match === '94728454663' || match === '0728454663') return      
if (!message.grpadmin) return await message.client.sendMessage(message.jid, {text: Lang.IM_NOT_ADMIN}, {quoted: message.data})
if (match === undefined || match === '' || match === ' ')return await message.client.sendMessage(message.jid, {text: Lang.E_USER}, {quoted:message.data})
try{
    await message.client.groupParticipantsUpdate(message.jid, [match + "@s.whatsapp.net"] ,"add" )
    const  msg = await message.client.sendMessage(message.jid , { text: '@' + match + ' , ```' + Lang.ADDED + '```'}, { quoted: message.data } ) 
    await message.client.sendMessage(message.jid, { react: {  text: "✅", key: msg.key } } )
}catch(err){
     return await message.client.sendMessage(message.jid, {text: Lang.ERR_ADD}, {quoted: message.data})
}

}))


