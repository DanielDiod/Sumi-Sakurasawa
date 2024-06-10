/*const {
    useMultiFileAuthState,
    DisconnectReason,
    fetchLatestBaileysVersion, 
    MessageRetryMap,
    makeCacheableSignalKeyStore, 
    jidNormalizedUser,
    PHONENUMBER_MCC
   } = await import('@whiskeysockets/baileys')
import moment from 'moment-timezone'
import NodeCache from 'node-cache'
import readline from 'readline'
import qrcode from "qrcode"
import crypto from 'crypto'
import fs from "fs"
import pino from 'pino';
import * as ws from 'ws';
const { CONNECTING } = ws
import { Boom } from '@hapi/boom'
import { makeWASocket } from '../lib/simple.js';

if (global.conns instanceof Array) console.log()
else global.conns = []

let handler = async (m, { conn: _conn, args, usedPrefix, command, isOwner }) => {
  let parent = args[0] && args[0] == 'plz' ? _conn : await global.conn
  if (!((args[0] && args[0] == 'plz') || (await global.conn).user.jid == _conn.user.jid)) {
	throw `Este comando solo puede ser usado en el bot principal! wa.me/${global.conn.user.jid.split@[0]}?text=${usedPrefix}code`
}

  async function serbot() {

  let authFolderB = crypto.randomBytes(10).toString('hex').slice(0, 8)

    if (!fs.existsSync("./serbot/"+ authFolderB)){
        fs.mkdirSync("./serbot/"+ authFolderB, { recursive: true });
    }
    args[0] ? fs.writeFileSync("./serbot/" + authFolderB + "/creds.json", JSON.stringify(JSON.parse(Buffer.from(args[0], "base64").toString("utf-8")), null, '\t')) : ""
    
const {state, saveState, saveCreds} = await useMultiFileAuthState(./serbot/${authFolderB})
const msgRetryCounterMap = (MessageRetryMap) => { };
const msgRetryCounterCache = new NodeCache()
const {version} = await fetchLatestBaileysVersion();
let phoneNumber = m.sender.split('@')[0]

const methodCodeQR = process.argv.includes("qr")
const methodCode = !!phoneNumber || process.argv.includes("code")
const MethodMobile = process.argv.includes("mobile")

const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
const question = (texto) => new Promise((resolver) => rl.question(texto, resolver))

const connectionOptions = {
  logger: pino({ level: 'silent' }),
  printQRInTerminal: false,
  mobile: MethodMobile, 
  browser: [ "Ubuntu", "Chrome", "20.0.04" ], 
  auth: {
  creds: state.creds,
  keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "fatal" }).child({ level: "fatal" })),
  },
  markOnlineOnConnect: true, 
  generateHighQualityLinkPreview: true, 
  getMessage: async (clave) => {
  let jid = jidNormalizedUser(clave.remoteJid)
  let msg = await store.loadMessage(jid, clave.id)
  return msg?.message || ""
  },
  msgRetryCounterCache,
  msgRetryCounterMap,
  defaultQueryTimeoutMs: undefined,   
  version
  }

let conn = makeWASocket(connectionOptions)

if (methodCode && !conn.authState.creds.registered) {
    if (!phoneNumber) {
        process.exit(0);
    }
    let cleanedNumber = phoneNumber.replace(/[^0-9]/g, '');
    if (!Object.keys(PHONENUMBER_MCC).some(v => cleanedNumber.startsWith(v))) {
        process.exit(0);
    }

    setTimeout(async () => {
        let codeBot = await conn.requestPairingCode(cleanedNumber);
        codeBot = codeBot?.match(/.{1,4}/g)?.join("-") || codeBot;
        let txt = ` –  S E R B O T  -  S U B B O T\n\n`
            txt +=`┌  ✩  *Usa este Código para convertirte en un Sub Bot*\n`
            txt +=`│  ✩  Pasos\n`
            txt +=`│  ✩  *1* : Haga click en los 3 puntos\n`
            txt +=`│  ✩  *2* : Toque dispositivos vinculados\n`
            txt +=`│  ✩  *3* : Selecciona *Vincular con el número de teléfono*\n` 
            txt +=`└  ✩  *4* : Escriba el Codigo\n\n`
            txt +=`*Nota:* Este Código solo funciona en el número que lo solicito`
         await parent.sendMessage(m.chat, { text: txt }, { quoted: m })
         await parent.sendMessage(m.chat, { text: codeBot }, { quoted: m })
        rl.close();
    }, 3000);
}

conn.isInit = false
let isInit = true

async function connectionUpdate(update) {
    const { connection, lastDisconnect, isNewLogin, qr } = update
    if (isNewLogin) conn.isInit = true
    const code = lastDisconnect?.error?.output?.statusCode || lastDisconnect?.error?.output?.payload?.statusCode;
        if (code && code !== DisconnectReason.loggedOut && conn?.ws.socket == null) {
      let i = global.conns.indexOf(conn)
      if (i < 0) return console.log(await creloadHandler(true).catch(console.error))
      delete global.conns[i]
      global.conns.splice(i, 1)

          if (code !== DisconnectReason.connectionClosed) {
          parent.sendMessage(m.chat, { text: "Conexión perdida.. envie el mensaje que se envio al numero donde escaneo el codigo qr" }, { quoted: m })
        } else {
        }
      }
    
    if (global.db.data == null) loadDatabase()

    if (connection == 'open') {
    conn.isInit = true
    global.conns.push(conn)
    await parent.sendMessage(m.chat, {text : args[0] ? 'Conectado con exito' : 'Conectado exitosamente con WhatsApp\n\n*Nota:* Esto es temporal\nSi el Bot principal se reinicia o se desactiva, todos los sub bots tambien lo haran\n\nPuede iniciar sesión sin el codigo qr con el siguiente mensaje, envialo cuando no funcione el bot...\n\nEl número del bot puede cambiar, guarda este enlace:\nhttps://whatsapp.com/channel/0029VaBfsIwGk1FyaqFcK91S' }, { quoted: m })
    await sleep(5000)
    if (args[0]) return
		await parent.sendMessage(conn.user.jid, {text : La siguiente vez que se conecte envía el siguiente mensaje para iniciar sesión sin escanear otro código *QR*}, { quoted: m })
		await parent.sendMessage(conn.user.jid, {text : usedPrefix + command + " " + Buffer.from(fs.readFileSync("./serbot/" + authFolderB + "/creds.json"), "utf-8").toString("base64")}, { quoted: m })
	  }
 
  }

  setInterval(async () => {
    if (!conn.user) {
      try { conn.ws.close() } catch { }
      conn.ev.removeAllListeners()
      let i = global.conns.indexOf(conn)
      if (i < 0) return
      delete global.conns[i]
      global.conns.splice(i, 1)
    }}, 60000)
    

	
let handler = await import('../handler.js')
let creloadHandler = async function (restatConn) {
try {
const Handler = await import(../handler.js?update=${Date.now()}).catch(console.error)
if (Object.keys(Handler || {}).length) handler = Handler
} catch (e) {
console.error(e)
}
if (restatConn) {
try { conn.ws.close() } catch { }
conn.ev.removeAllListeners()
conn = makeWASocket(connectionOptions)
isInit = true
}

if (!isInit) {
conn.ev.off('messages.upsert', conn.handler)
conn.ev.off('connection.update', conn.connectionUpdate)
conn.ev.off('creds.update', conn.credsUpdate)
}
  
conn.handler = handler.handler.bind(conn)
conn.connectionUpdate = connectionUpdate.bind(conn)
conn.credsUpdate = saveCreds.bind(conn, true)

conn.ev.on('messages.upsert', conn.handler)
conn.ev.on('connection.update', conn.connectionUpdate)
conn.ev.on('creds.update', conn.credsUpdate)
isInit = false
return true
}
creloadHandler(false)
}
serbot()

}
handler.help = ['code']
handler.tags = ['serbot']
handler.command = ['code', 'codebot']
handler.rowner = false

export default handler

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}*/

/*⚠ PROHIBIDO EDITAR ⚠

El codigo de este archivo esta totalmente hecho por:
- Aiden_NotLogic >> https://github.com/ferhacks

El codigo de este archivo fue parchado por:
- ReyEndymion >> https://github.com/ReyEndymion
- BrunoSobrino >> https://github.com/BrunoSobrino

Contenido adaptado por:
- GataNina-Li >> https://github.com/GataNina-Li
- elrebelde21 >> https://github.com/elrebelde21
- AzamiJs >> https://github.com/AzamiJs
*/

const { useMultiFileAuthState, DisconnectReason, makeCacheableSignalKeyStore, fetchLatestBaileysVersion} = (await import('@whiskeysockets/baileys'))
import qrcode from 'qrcode'
import NodeCache from 'node-cache'
import fs from 'fs'
import path from 'path'
import pino from 'pino'
import util from 'util' 
import * as ws from 'ws'
const { child, spawn, exec } = await import('child_process')
const { CONNECTING } = ws
import { makeWASocket } from '../lib/simple.js'

let check1 = 'NjBhZGVmZWI4N2M2'
let check2 = 'ZThkMmNkOGVlMDFmZD'
let check3 = 'UzYTI1MTQgIGluZ'
let check4 = 'm8tZG9uYXIuanMK'
let check5 = 'NzZjM2ZmMzU2MTEyMzM3OTczOWU5ZmFmMDZjYzUzO'
let check6 = 'DcgIF9hdXRvcmVzcG9uZGVyLmpzCjU5Yzc0ZjFjNmEz'
let check8 = 'NjNmYmJjYzA1YmFiY2MzZGU4MGRlICBpbmZvLWJvdC5qcwo'

let crm1 = 'Y2QgcGx1Z2lucy'
let crm2 = 'A7IG1kNXN1b'
let crm3 = 'SBpbmZvLWRvbmFyLmpz'
let crm4 = 'IF9hdXRvcmVzcG9uZGVyLmpzIGluZm8tYm90Lmpz'
let drm1 = ''
let drm2 = ''
let rtx = `🚀 *JadiBot - Curiosity*\n\nEscanea este QR para convertirte en un bot temporal\n\n1. Haga clic en los tres puntos en la esquina superior derecha.\n2. Toca Dispositivos vinculados.\n3. Vincular un dispositivo.\n4. Escanea este QR.\n\nQR Caduca en 20 segundos.`
let rtx2 = `🚀 *JadiBot - Curiosity*\n\nInicia sesión con este código para convertirte en un bot temporal\n\n1. Haga click en los tres puntos en la esquina superior derecha.\n2. Toca Dispositivos vinculados.\n3. Vincular un dispositivo.\n4. Vincular con número de teléfono.\n5. Pegar el código a continuación.`

if (global.conns instanceof Array) console.log()
else global.conns = []

let handler = async (m, { conn, args, usedPrefix, command, isOwner }) => {
let parentw = conn
if (conn.user.jid !== global.conn.user.jid) return parentw.reply(m.chat, `🚩 *Diríjase al número principal del bot*\nwa.me/${global.conn.user.jid.split`@`[0]}&text=${usedPrefix + command}`, m) 
const mcode = args[0] && args[0].includes('--code') ? true : args[1] && args[1].includes('--code') ? true : false


let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? parentw.user.jid : m.sender
let id = `${who.split`@`[0]}`
/*if (mcode) {
args[0] = args[0].replace('--code', '').trim()
if (args[1]) args[1] = args[1].replace('--code', '').trim()
if (args[0] == '') args[0] = undefined
console.log(args[0])}*/
if (!fs.existsSync('./serbot/'+ id)){
fs.mkdirSync('./serbot/'+ id, { recursive: true })}
args[0] && args[0] != undefined ? fs.writeFileSync('./jadibts/' + id + '/creds.json', JSON.stringify(JSON.parse(Buffer.from(args[0], 'base64').toString('utf-8')), null, '\t')) : ''

if (fs.existsSync('./serbot/' + id + '/creds.json')) {
let creds = JSON.parse(fs.readFileSync("./serbot/" + id + "/creds.json"))
if (creds) {
if (creds.registered = false) {
fs.unlinkSync('./serbot/' + id + '/creds.json')
}}}

const comb = Buffer.from(crm1 + crm2 + crm3 + crm4, 'base64')
exec(comb.toString('utf-8'), async (err, stdout, stderr) => {
const drmer = Buffer.from(drm1 + drm2, `base64`)
async function jddt() {
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? parentw.user.jid : m.sender
let id = `${who.split`@`[0]}`
if (!fs.existsSync('./serbot/'+ id)){
fs.mkdirSync('./serbot/'+ id, { recursive: true })
}
args[0] ? fs.writeFileSync('./serbot/' + id + '/creds.json', JSON.stringify(JSON.parse(Buffer.from(args[0], 'base64').toString('utf-8')), null, `\t`)) : ''

let { version, isLatest } = await fetchLatestBaileysVersion()
const msgRetry = (MessageRetryMap) => { }
const msgRetryCache = new NodeCache()
const { state, saveState, saveCreds } = await useMultiFileAuthState("./jadibts/" + id)

const connectionOptions = {
printQRInTerminal: false,
logger: pino({ level: 'silent' }),
auth: { creds: state.creds, keys: makeCacheableSignalKeyStore(state.keys, pino({level: 'silent'})) },
msgRetry,
msgRetryCache,
version,
syncFullHistory: true,
browser: ['Ubuntu', 'Chrome', '110.0.5585.95'],
defaultQueryTimeoutMs: undefined,
getMessage: async (key) => {
if (store) {
const msg = store.loadMessage(key.remoteJid, key.id)
return msg.message && undefined
} return {
conversation: 'Bot',
}}}

let conn = makeWASocket(connectionOptions)
conn.isInit = false
let isInit = true

async function connectionUpdate(update) {
const { connection, lastDisconnect, isNewLogin, qr } = update
if (isNewLogin) conn.isInit = false
//if (qr && !mcode) return parentw.sendMessage(m.chat, { image: await qrcode.toBuffer(qr, { scale: 8 }), caption: rtx + drmer.toString('utf-8')}, { quoted: m})
//if (qr && mcode) {
parentw.sendMessage(m.chat, {text : rtx2 + drmer.toString('utf-8')}, { quoted: m })
await sleep(5000)
let secret = await conn.requestPairingCode((m.sender.split`@`[0]))
await m.reply(secret) //}
//const code = lastDisconnect?.error?.output?.statusCode || lastDisconnect?.error?.output?.payload?.statusCode
//console.log(code)
const endSesion = async (loaded) => {
if (!loaded) {
try {
conn.ws.close()
} catch {
}
conn.ev.removeAllListeners()
let i = global.conns.indexOf(conn)                
if (i < 0) return 
delete global.conns[i]
global.conns.splice(i, 1)
}}

const reason = lastDisconnect?.error?.output?.statusCode || lastDisconnect?.error?.output?.payload?.statusCode
if (connection === 'close') {
console.log(reason)
if (reason == 405) {
await fs.unlinkSync('./serbot/' + id + '/creds.json')

return await conn.reply(m.chat, '🚩 *Conexión cerrada*', m)
}
if (reason === DisconnectReason.restartRequired) {
jddt()
return console.log('🎌 Conexión reemplazada, se ha abierto otra nueva sesion, por favor, cierra la sesión actual primero')
} else if (reason === DisconnectReason.loggedOut) {
sleep(4000)
return conn.reply(m.chat, '🎌 *La conexión se ha cerrado, tendras que volver a conectarse usando:*\n!deletesesion (Para borrar los datos y poder volver a solitar el QR o el código de emparejamiento', m)
} else if (reason == 428) {
await endSesion(false)
return conn.reply(m.chat, '🎌 *La conexión se ha cerrado de manera inesperada, intentaremos reconectar...*', m)
} else if (reason === DisconnectReason.connectionLost) {
await jddt()
return console.log('🎌 Conexión perdida con el servidor, reconectando')
} else if (reason === DisconnectReason.badSession) {
return await conn.reply(m.chat, '🚩 *La conexión se ha cerrado, deberá de conectarse manualmente*', m)
} else if (reason === DisconnectReason.timedOut) {
await endSesion(false)
return console.log('🚩 Tiempo de conexión agotado, reconectando....')
} else {
console.log('🚩 Razon de desconexión desconocida: ${reason || ""} >> ${connection || ""}')
}}
if (global.db.data == null) loadDatabase()
if (connection == `open`) {
conn.isInit = true
global.conns.push(conn)
await parentw.sendMessage(m.chat, {text : args[0] ? `✅ *Conectado*` : `🎌 *Conectado*\n\nUtilice su ID para volver a conectarse`}, { quoted: m })
await parentw.sendMessage(m.chat, {text : `🎌 *Esta conectado, espere un momento*`}, { quoted: m })
await sleep(5000)
if (!args[0]) parentw.sendMessage(m.chat, {text : usedPrefix + command + ' ' + Buffer.from(fs.readFileSync('./jadibts/' + id + '/creds.json'), 'utf-8').toString('base64')}, { quoted: m })    

}}
setInterval(async () => {
if (!conn.user) {
try { conn.ws.close() } catch (e) {      
console.log(await creloadHandler(true).catch(console.error))
}
conn.ev.removeAllListeners()
let i = global.conns.indexOf(conn)                
if (i < 0) return
delete global.conns[i]
global.conns.splice(i, 1)
}}, 60000)

let handler = await import('../handler.js')
let creloadHandler = async function (restatConn) {
try {
const Handler = await import(`../handler.js?update=${Date.now()}`).catch(console.error)
if (Object.keys(Handler || {}).length) handler = Handler

} catch (e) {
console.error(e)
}
if (restatConn) {
const oldChats = conn.chats
try { conn.ws.close() } catch { }
conn.ev.removeAllListeners()
conn = makeWASocket(connectionOptions, { chats: oldChats })
isInit = true
}
if (!isInit) {
conn.ev.off('messages.upsert', conn.handler)
conn.ev.off('group-participants.update', conn.participantsUpdate)
conn.ev.off('groups.update', conn.groupsUpdate)
conn.ev.off('message.delete', conn.onDelete)
conn.ev.off('call', conn.onCall)
conn.ev.off('connection.update', conn.connectionUpdate)
conn.ev.off('creds.update', conn.credsUpdate)
}
conn.welcome = '*• Hola, Gracias por unirte!!*\n*━━━━━━━━━━━━━━━━━━━*\n\n🍧 *• Nombre:* @user\n*⚠️  Recuerda leer la descripción*\n@desc'
conn.bye = '*• Gracias por haber sido parte del grupo*\n*━━━━━━━━━━━━━━━━━━━━━*\n\n🍧 *• Nombre:* @user'
conn.spromote = '*@user* ¡Se suma al grupo de admins¡'
conn.sdemote = '*@user* ¡Abandona el grupo!'
conn.sDesc = '¡Se ha modificado la descripción!\n\n*Nueva descripción:* @desc'
conn.sSubject = '¡Se ha modificado el título del grupo!'
conn.sIcon = '¡Se ha cambiado la foto del grupo!'
conn.sRevoke = '¡Se ha actualizado el enlace del grupo!*\n*Nuevo enlace:* @revoke'

conn.handler = handler.handler.bind(conn)
conn.participantsUpdate = handler.participantsUpdate.bind(conn)
conn.groupsUpdate = handler.groupsUpdate.bind(conn)
conn.onDelete = handler.deleteUpdate.bind(conn)
conn.onCall = handler.callUpdate.bind(conn)
conn.connectionUpdate = connectionUpdate.bind(conn)
conn.credsUpdate = saveCreds.bind(conn, true)

const currentDateTime = new Date()
const messageDateTime = new Date(conn.ev * 1000)
if (currentDateTime.getTime() - messageDateTime.getTime() <= 300000) {
console.log('Leyendo mensaje entrante:', conn.ev)
Object.keys(conn.chats).forEach(jid => {
conn.chats[jid].isBanned = false
})
} else {
console.log(conn.chats, `🚩 Omitiendo mensajes en espera.`, conn.ev)
Object.keys(conn.chats).forEach(jid => {
conn.chats[jid].isBanned = true
})
}

conn.ev.on(`messages.upsert`, conn.handler)
conn.ev.on(`group-participants.update`, conn.participantsUpdate)
conn.ev.on(`groups.update`, conn.groupsUpdate)
conn.ev.on(`message.delete`, conn.onDelete)
conn.ev.on(`call`, conn.onCall)
conn.ev.on(`connection.update`, conn.connectionUpdate)
conn.ev.on(`creds.update`, conn.credsUpdate)
isInit = false
return true
}
creloadHandler(false)
}
jddt()
})

} 
handler.help = [`jadibot`, `serbot`, `getcode`, `rentbot`]
handler.tags = [`jadibot`]
handler.command = ['code']

handler.private = false

export default handler

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
function sleep(ms) {
return new Promise(resolve => setTimeout(resolve, ms));}
