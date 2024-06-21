import { watchFile, unwatchFile } from 'fs' 
import chalk from 'chalk'
import { fileURLToPath } from 'url'
import fs from 'fs'
import cheerio from 'cheerio'
import fetch from 'node-fetch'
import axios from 'axios'
import moment from 'moment-timezone' 

//*꒷꒦꒷꒷꒦꒷꒦꒷꒷꒦꒷꒦꒷꒦꒷꒷꒦꒷꒷꒦꒷꒷꒦꒷꒦꒷꒦꒷꒦꒷*

global.owner = [
  ['51955918117', 'Daniel', true],
  ['5214434703586', 'Zam', false],
  ['51955918117'],
  ['51955918117'],
  ['51955918117'],
  ['51955918117'],
  ['51955918117'],
  ['51955918117'],
  ['51955918117'],
  ['595983799436']

]

//*꒷꒦꒷꒷꒦꒷꒦꒷꒷꒦꒷꒦꒷꒦꒷꒷꒦꒷꒷꒦꒷꒷꒦꒷꒦꒷꒦꒷꒦꒷*

global.mods = []
global.prems = []
   
//*꒷꒦꒷꒷꒦꒷꒦꒷꒷꒦꒷꒦꒷꒦꒷꒷꒦꒷꒷꒦꒷꒷꒦꒷꒦꒷꒦꒷꒦꒷*

global.packname = `Sumi Sakurasawa - MD`
global.author = 'Daniel'
global.botname = 'Sumi Sakurasawa - MD'
global.listo = '*🍭 Aqui tiene*'
global.textbot = `© 2024 Starlights Team | All rights reserved`
global.wm = `Sumi`

//*꒷꒦꒷꒷꒦꒷꒦꒷꒷꒦꒷꒦꒷꒦꒷꒷꒦꒷꒷꒦꒷꒷꒦꒷꒦꒷꒦꒷꒦꒷*

global.group = 'https://whatsapp.com/channel/0029VaBpO8M3rZZdwkGFIP33'
global.group2 = 'https://whatsapp.com/channel/0029VaBpO8M3rZZdwkGFIP33'
global.group3 = 'https://whatsapp.com/channel/0029VaBpO8M3rZZdwkGFIP33'
global.group4 = 'https://whatsapp.com/channel/0029VaBpO8M3rZZdwkGFIP33'
global.group5 = 'https://whatsapp.com/channel/0029VaBpO8M3rZZdwkGFIP33'
global.canal = 'https://whatsapp.com/channel/0029VaBpO8M3rZZdwkGFIP33'

//*꒷꒦꒷꒷꒦꒷꒦꒷꒷꒦꒷꒦꒷꒦꒷꒷꒦꒷꒷꒦꒷꒷꒦꒷꒦꒷꒦꒷꒦꒷*

global.cheerio = cheerio
global.fs = fs
global.fetch = fetch
global.axios = axios
global.moment = moment	

//*꒷꒦꒷꒷꒦꒷꒦꒷꒷꒦꒷꒦꒷꒦꒷꒷꒦꒷꒷꒦꒷꒷꒦꒷꒦꒷꒦꒷꒦꒷*

global.multiplier = 69 
global.maxwarn = '2' // máxima advertencias

//*꒷꒦꒷꒷꒦꒷꒦꒷꒷꒦꒷꒦꒷꒦꒷꒷꒦꒷꒷꒦꒷꒷꒦꒷꒦꒷꒦꒷꒦꒷*

let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  console.log(chalk.redBright("Se actualizo 'config.js'"))
  import(`${file}?update=${Date.now()}`)
})
