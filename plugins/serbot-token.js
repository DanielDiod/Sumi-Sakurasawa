import fs from "fs"
async function handler(m, {usedPrefix}) {
    const user = m.sender.split("@")[0]
    if (fs.existsSync("./serbot/" + user + "/creds.json")) {
        let token = Buffer.from(fs.readFileSync("./serbot/" + user + "/creds.json"), "utf-8").toString("base64")
        await m.reply(`🍭 No compartas tu Token con nadie.\n📫 Tu Token es:`)
        await m.reply(token)
    } else {
        await m.reply(`🍭 No tienes un Token activo.`)
    }
  }
  handler.command = ['token']
  handler.help = ['token']
  handler.tags = ['jadibot']
  handler.registrado = true
  handler.private = false
  export default handler
