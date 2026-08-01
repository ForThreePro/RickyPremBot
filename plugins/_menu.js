import moment from 'moment-timezone'
import os from 'os'

const CATEGORY_META = {
config: '⚙️ 𝗖𝗢𝗡𝗙𝗜𝗚',
main: '🔧 𝗠𝗔𝗜𝗡',
tools: '🛠️ 𝗧𝗢𝗟𝗦',
owner: '👑 𝗢𝗪𝗡𝗘𝗥',
sorteos: '🎯 𝗦𝗢𝗥𝗧𝗘𝗢𝗦',
fun: '😈 𝗙𝗨𝗡',
joda: '😎 𝗝𝗢𝗗𝗔',
ff: '🔫 𝗙𝗙',
buscadores: '🔍 𝗦𝗘𝗔𝗥𝗖𝗛',
descargas: '📥 𝗗𝗢𝗪𝗡𝗟𝗢𝗔𝗗𝗘𝗥',
grupo: '⚔️ 𝗚𝗥𝗨𝗣𝗢𝗦',
group: '🛡️ 𝗚𝗥𝗨𝗣𝗢',
gacha: '👥 𝗚𝗥𝗢𝗨𝗣',
ia: '🤖 𝗜𝗡𝗧𝗘𝗟𝗜𝗚𝗘𝗡𝗖𝗜𝗔 𝗔𝗥𝗧𝗜𝗙𝗜𝗖𝗜𝗔𝗟',
info: 'ℹ️ 𝗜𝗡𝗙𝗢',
sticker: '🎨 𝗦𝗧𝗜𝗖𝗞𝗘𝗥',
}

let handler = async (m, { conn }) => {
try {
await conn.sendMessage(m.chat, { react: { text: '🧪', key: m.key } })

const fecha = moment.tz('America/Lima').format('dddd')
const fecha2 = moment.tz('America/Lima').format('DD [de] MMMM [de] YYYY')
const hora = moment.tz('America/Lima').format('hh:mm:ss a')
const uptime = process.uptime()
const horas = Math.floor(uptime / 3600)
const minutos = Math.floor((uptime % 3600) / 60)
const segundos = Math.floor(uptime % 60)
const ram = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)
const totalram = (os.totalmem() / 1024 / 1024 / 1024).toFixed(2)
const pluginsCount = Object.values(global.plugins || {}).filter(p =>!p?.disabled).length
const totalUsers = Object.keys(global.db.data.users || {}).length

const byTag = {}
for (const plugin of Object.values(global.plugins || {})) {
  if (plugin.disabled) continue
  const tags = Array.isArray(plugin.tags)? plugin.tags : (plugin.tags? [plugin.tags] : [])
  const helps = Array.isArray(plugin.help)? plugin.help : (plugin.help? [plugin.help] : [])
  for (const tag of tags) {
    if (!CATEGORY_META[tag]) continue
    if (!byTag[tag]) byTag[tag] = new Set()
    for (const h of helps) if (typeof h === 'string' && h.trim()) byTag[tag].add(h.trim())
  }
}

const userName = m.pushName || 'Usuario'
const IMG_MENU = 'https://files.evogb.win/60yIxv.jpg' // FOTO RICKY

let menuTexto = `╭─💚 *『 𝗥𝗜𝗖𝗞𝗬 𝗣𝗥𝗘𝗠 』* 💚─╮
│ 🧪 *BOT:* v3.0 Ricky
│ 📡 *STATUS:* Online • ${horas}h ${minutos}m ${segundos}s
╰─────────────────💚

╭─「 👤 𝗨𝗦𝗨𝗔𝗥𝗜𝗢 」─💚─╮
│ 😎 @${userName}
│ 💬 "Wubba Lubba Dub Dub bro"
╰─────────────────💚

──🧪 *𝗘𝗦𝗧𝗔𝗗𝗜𝗦𝗧𝗜𝗖𝗔𝗦* ╏ 📊
👥 *USUARIOS:* ${totalUsers} | 📜 *COMANDOS:* ${pluginsCount}
💾 *RAM:* ${ram}mb | 🌐 *SERVIDOR:* ${totalram}gb

──🔧 *𝗦𝗜𝗦𝗧𝗘𝗠𝗔* 🔧──
📅 *DIA:* ${fecha}
📆 *FECHA:* ${fecha2}
🕐 *HORA:* ${hora} | 📡 *PING:* ${Math.round(performance.now())}ms

`

for (const tag of Object.keys(CATEGORY_META)) {
  const set = byTag[tag]
  if (!set || set.size === 0) continue
  const cmds = [...set].sort()

  let icono = '🧪'
  if(tag === 'config') icono = '⚙️'
  if(tag === 'owner') icono = '👑'
  if(tag === 'fun') icono = '😈'
  if(tag === 'joda') icono = '😎'
  if(tag === 'ff') icono = '🔫'
  if(tag === 'buscadores') icono = '🔍'
  if(tag === 'descargas') icono = '📥'
  if(tag === 'grupo') icono = '⚔️'
  if(tag === 'grupos') icono = '🛡️'
  if(tag === 'gacha') icono = '👥'
  if(tag === 'ia') icono = '🤖'
  if(tag === 'info') icono = 'ℹ️'
  if(tag === 'sticker') icono = '🎨'

  menuTexto += `\n╭─「 ${CATEGORY_META[tag]} 」─💚─╮\n`
  menuTexto += cmds.map(c => `│ ${icono}.${c}`).join('\n') + '\n'
  menuTexto += `╰─────────────────💚\n`
}

menuTexto += `
╭─💚 *『 𝗥𝗜𝗖𝗞𝗬 𝗣𝗥𝗘𝗠 』* 💚─╮
│ 🧪 *BOT:* Ricky Prem v3.0
│ 👑 *CREADOR:* Whois Yalli co
│ 🌐 *WEB:* github.com
│
│ > "Con gran poder viene gran responsabilidad"
╰─────────────────💚`

await conn.sendMessage(m.chat, {
  image: { url: IMG_MENU },
  caption: menuTexto.trim(),
  mentions: [m.sender]
}, { quoted: m })

} catch (e) {
await conn.sendMessage(m.chat, { text: `╭─💚 *『 𝗥𝗜𝗖𝗞𝗬 𝗘𝗥𝗢𝗥 』* 💚─╮\n│ 😿 *SYSTEM ERROR:* ${e.message}\n╰─────────────────💚` }, { quoted: m })
}
}

handler.help = ['menu']
handler.tags = ['info']
handler.command = ['menu', 'help', 'menuricky']

export default handler