import { areJidsSameUser } from '@whiskeysockets/baileys'
let handler = async (m, { conn, args }) => {
    let group = m.chat
    if (/^[0-9]{5,16}-?[0-9]+@g\.us$/.test(args[0])) group = args[0]
    let groupMetadata = await conn.groupMetadata(group)
    if (!groupMetadata) return m.react('✖️')
    if (!('participants' in groupMetadata)) return m.react('✖️')
    let me = groupMetadata.participants.find(user => areJidsSameUser(user.id, conn.user.id))
    if (!me) return m.reply('*🍭 No estoy en ese grupo :(*')
    if (!me.admin) return m.reply('*🍭 No soy administradora*')
    m.reply('https://chat.whatsapp.com/' + await conn.groupInviteCode(group))
}
handler.help = ['link']
handler.tags = ['group']
handler.command = ['link', 'linkgroup'] 
handler.group = true 
export default handler
