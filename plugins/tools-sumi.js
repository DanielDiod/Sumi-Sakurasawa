import Starlights from '@StarlightsTeam/Scraper'

let handler = async (m, { conn, text, usedPrefix, command }) => {
if (!text) return conn.reply(m.chat, `*🍭 Ingrese su petición*\n*🪼 Ejemplo de uso:*\n> ${usedPrefix + command} como hacer estrella de papel`, m, rcanal)
await m.react('📖')
try {
let { msg } = await Starlights.openAi(text)
await conn.reply(m.chat, msg, m)
} catch {
}}
handler.help = ['ai *<petición>*']
handler.tags = ['tools']
handler.command = /^(sumi|ai|ia|chatgpt|gpt)$/i
handler.register = true
export default handler
