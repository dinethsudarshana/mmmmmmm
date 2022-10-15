/*
░█████╗░░█████╗░██████╗░██████╗░░█████╗░░░░░░░███╗░░░███╗██████╗░
██╔══██╗██╔══██╗██╔══██╗██╔══██╗██╔══██╗░░░░░░████╗░████║██╔══██╗
██║░░╚═╝██║░░██║██████╦╝██████╔╝███████║█████╗██╔████╔██║██║░░██║
██║░░██╗██║░░██║██╔══██╗██╔══██╗██╔══██║╚════╝██║╚██╔╝██║██║░░██║
╚█████╔╝╚█████╔╝██████╦╝██║░░██║██║░░██║░░░░░░██║░╚═╝░██║██████╔╝
░╚════╝░░╚════╝░╚═════╝░╚═╝░░╚═╝╚═╝░░╚═╝░░░░░░╚═╝░░░░░╚═╝╚═════╝░ BY SISULA WELGAMAGE

Coded By  Sisula welgamage | 2022/08/08 Main Release | Docker Image : sisula/whatsapp_bot | Host: AWS(Heroku) OR etc. | Terminal: Node 
*/

const fs = require("fs");
const path = require("path");
const { Boom } = require('@hapi/boom')
const {
	default: makeWASocket,
	useSingleFileAuthState,
	DisconnectReason
} = require('@adiwajshing/baileys')
const {  fetchLatestBaileysVersion, generateForwardMessageContent, prepareWAMessageMedia, generateWAMessageFromContent, generateMessageID, downloadContentFromMessage, makeInMemoryStore,  proto } = require("@adiwajshing/baileys")
const { default: got } = import('got');
const P = require('pino')
const {eventEmit} = require("cobra-event-emit").event_emit//
const { state, saveState } = useSingleFileAuthState('./session.json')
const {err_msg} =  require("./err_msg")
const config = require('./config');
const store = makeInMemoryStore({ logger: P().child({ level: 'silent', stream: 'store' }) })

fs.readdirSync('./plugins/sql/').forEach(plugin => {
    if(path.extname(plugin).toLowerCase() == '.js') {
        require('./plugins/sql/' + plugin);
    }
});

const plugindb = require('./plugins/sql/plugin');

String.prototype.format = function () {
    var i = 0, args = arguments;
    return this.replace(/{}/g, function () {
      return typeof args[i] != 'undefined' ? args[i++] : '';
   });
};
if (!Date.now) {
    Date.now = function() { return new Date().getTime(); }
}

Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};

async function cobrabot () {
    await config.DATABASE.sync();
    const { version } = await fetchLatestBaileysVersion();
	const conn = makeWASocket({

		logger: P({ level: 'silent' }),// {level: 'debug'}
		printQRInTerminal: true, // QR PRINT TERMINAL
		browser: ['COBRA-MD','Safari','1.0.0'], // BROWSER | VERSION
		auth: state, // AUTH | SESSION
		version: version // FETCH LATEST BAILEYS VERSION

	})
    store.bind(conn.ev)

    conn.ev.on('connection.update', async(update) => {
        const { connection, lastDisconnect } = update
		if (connection === 'close') {
            let reason = new Boom(lastDisconnect?.error)?.output?.statusCode
            if (reason === DisconnectReason.badSession) { console.log(`Bad Session File, Please Delete Session and Scan Again`); process.exit(); }
            else if (reason === DisconnectReason.connectionClosed) { console.log("Connection closed, Reconnecting...."); cobrabot (); }
            else if (reason === DisconnectReason.connectionLost) { console.log("Connection Lost from Server, Reconnecting..."); cobrabot (); }
            else if (reason === DisconnectReason.connectionReplaced) { console.log("Connection Replaced, Another New Session Opened, Please Close Current Session First"); process.exit(); }
            else if (reason === DisconnectReason.loggedOut) { console.log(`Device Logged Out, Please Delete Session And Scan Again.`);fs.unlinkSync('./session.json'); process.exit(); }
            else if (reason === DisconnectReason.restartRequired) { console.log("Restart Required, Restarting..."); cobrabot (); }
            else if (reason === DisconnectReason.timedOut) { console.log("Connection TimedOut, Reconnecting..."); cobrabot (); }
            else { console.log(`Unknown DisconnectReason: ${reason}|${connection}`) }
			
		} else if (connection === 'open') {
        console.log(
            '✅ පුරනය වීම සාර්ථකයි!'// ''
        );

        console.log(
            '⬇️ බාහිර Plugin ස්ථාපනය කිරීම ...')//'✅ INSTALLING EXTERNEL PLUGINS... PLEASE WAIT...'

        var plugins = await plugindb.PluginDB.findAll();
        plugins.map(async (plugin) => {
            if (!fs.existsSync('./plugins/' + plugin.dataValues.name + '.js')) {
                console.log(plugin.dataValues.name);
                var response = await got(plugin.dataValues.url);
                if (response.statusCode == 200) {
                    fs.writeFileSync('./plugins/' + plugin.dataValues.name + '.js', response.body);
                    require('./plugins/' + plugin.dataValues.name + '.js');
                }     
            }
        });

        console.log(
            '⬇️  Plugin ස්ථාපනය කිරීම ...'// '✅ INSTALLING PLUGINS... PLEASE WAIT..'
        );

        fs.readdirSync('./plugins').forEach(plugin => {
            if(path.extname(plugin).toLowerCase() == '.js') {
                require('./plugins/' + plugin);
            }
        });

        console.log(
            '✅ Plugin ස්ථාපනය කර ඇත!' // '✅ PLUGINS INSTALLED  WITHOUT ANY ERRORS!'
        );
        await conn.sendMessage(conn.user.id, {text: 'hello'})
        }
        
        });
    conn.ev.on('creds.update', saveState)
    
    
    conn.ev.on('messages.upsert', async(m) => {
        await eventEmit(conn, m, err_msg, config)
    }
        );
    
    
}

cobrabot();