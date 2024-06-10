let handler = async (m, { conn, usedPrefix, isOwner }) => {
let vcard = `BEGIN:VCARD\nVERSION:3.0\nN:Daniel 🇦🇱;;\nFN:Daniel 🇦🇱\nORG:Daniel 🇦🇱\nTITLE:\nitem1.TEL;waid=51955918117:51955918117\nitem1.X-ABLabel:Daniel 🇦🇱\nX-WA-BIZ-DESCRIPTION:\nX-WA-BIZ-NAME:Daniel 🇦🇱\nEND:VCARD`
await conn.sendMessage(m.chat, { contacts: { displayName: 'おDanịel.xyz⁩', contacts: [{ vcard }] }}, {quoted: m})
}
handler.help = ['owner']
handler.tags = ['main']
handler.command = ['owner', 'creator', 'creador', 'dueño'] 

export default handler
