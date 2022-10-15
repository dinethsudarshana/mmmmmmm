/*
░█████╗░░█████╗░██████╗░██████╗░░█████╗░░░░░░░███╗░░░███╗██████╗░
██╔══██╗██╔══██╗██╔══██╗██╔══██╗██╔══██╗░░░░░░████╗░████║██╔══██╗
██║░░╚═╝██║░░██║██████╦╝██████╔╝███████║█████╗██╔████╔██║██║░░██║
██║░░██╗██║░░██║██╔══██╗██╔══██╗██╔══██║╚════╝██║╚██╔╝██║██║░░██║
╚█████╔╝╚█████╔╝██████╦╝██║░░██║██║░░██║░░░░░░██║░╚═╝░██║██████╔╝
░╚════╝░░╚════╝░╚═════╝░╚═╝░░╚═╝╚═╝░░╚═╝░░░░░░╚═╝░░░░░╚═╝╚═════╝░ BY SISULA WELGAMAGE

Coded By  Sisula welgamage | 2022/08/08 Main Release | Docker Image : sisula/whatsapp_bot | Host: AWS(Heroku) OR etc. | Terminal: Node 

const {addCMD} = require('cobra-event-emit').events;
const  config =  require('../config')//
const { imageToWebp, videoToWebp, writeExif } = require('../lib/sticker')

var wk = []; if (config.WORKTYPE === 'private' || config.WORKTYPE === 'Private'){ wk = true } else if (config.WORKTYPE === 'public' || config.WORKTYPE === 'Public') {wk = false} else {return}

addCMD({pattern: 'sticker$', desc: '', fromMe: true, onlyGroup: false, ismentioJid: true}, (async (message,  match) => {
    var media = []
    await message.client.sendMessage(message.jid, {text: 'media'}, {quoted: message.data})
    if (message.quoted.image){
        if (message.quoted.replyImage){
            media = await message.quoted.downloadMediamsg
            await message.client.sendMessage(message.jid, {image: media}, {quoted: message.data})
        }else{
            media = await message.quoted.downloadMediamsg
            await message.client.sendMessage(message.jid, {image: media}, {quoted: message.data})
            
        }
    }
    if (message.quoted.video){
        if (message.quoted.replyImage){
            media = await message.quoted.downloadMediamsg
            await message.client.sendMessage(message.jid, {video: media}, {quoted: message.data})
        }else{
            media = await message.quoted.downloadMediamsg
            await message.client.sendMessage(message.jid, {video: media}, {quoted: message.data})
            
        } 
    }
    
    }))

    */