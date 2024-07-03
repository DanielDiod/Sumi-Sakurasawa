import fetch from 'node-fetch';
import axios from 'axios';
import translate from '@vitalets/google-translate-api';
import {Configuration, OpenAIApi} from 'openai';
const configuration = new Configuration({organization: global.openai_org_id, apiKey: global.openai_key});
const openaiii = new OpenAIApi(configuration);
const handler = async (m, {conn, text, usedPrefix, command}) => {
//if (usedPrefix == 'a' || usedPrefix == 'A') return;
if (!text) return m.reply(`🍭 Ingresé el texto lo que desea averiguar con bing`) 
try {
conn.sendPresenceUpdate('composing', m.chat);
let gpt = await fetch(`https://delirius-api-oficial.vercel.app/api/bingia?query=${text}`)
let res = await gpt.json()
await m.reply(res.message)
} catch (e) {
m.reply(`❌ Error` + e) 
console.log(e) 
}}
handler.help = ["copilot"]
handler.tags = ["tools"]
handler.command = /^(copilot|bing)$/i;
handler.register = true
export default handler;
