import moment from 'moment-timezone'
import os from 'os'

const CATEGORY_META = {
config: '⚙️ 𝗖𝗢𝗡𝗙𝗜𝗚',
main: '🔧 𝗠𝗔𝗜𝗡',
tools: '🛠️ 𝗧𝗢𝗢𝗟𝗦',
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

const ICONOS_CATEGORIA = {
config: '⚙️', owner: '👑', fun: '😈', joda: '😎', ff: '🔫', buscadores: '🔍',
descargas: '📥', grupo: '⚔️', group: '🛡️', gacha: '👥', ia: '🤖',
info: 'ℹ️', sticker: '🎨', main: '🔧', tools: '🛠️', sorteos: '🎯'
}

const EMOJIS_RANDOM = ['🧪','💚','😎','👽','🌌','🔬','⚡','🌀']

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

// AHORA DETECTA TODAS LAS CATEGORIAS
const byTag = {}
for (const plugin of Object.values(global.plugins || {})) {
  if (plugin.disabled) continue
  const tags = Array.isArray(plugin.tags)? plugin.tags : (plugin.tags? [plugin.tags] : [])
  const helps = Array.isArray(plugin.help)? plugin.help : (plugin.help? [plugin.help] : [])
  for (const tag of tags) {
    const t = tag.toLowerCase()
    if (!byTag[t]) byTag[t] = new Set() // sin filtro
    for (const h of helps) if (typeof h === 'string' && h.trim()) byTag[t].add(h.trim())
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

// Ordena: primero las de CATEGORY_META, luego las nuevas
const tagsOrdenados = Object.keys(byTag).sort((a, b) => {
  const aIn = CATEGORY_META[a]? 0 : 1
  const bIn = CATEGORY_META[b]? 0 : 1
  return aIn - bIn
})

for (const tag of tagsOrdenados) {
  const set = byTag[tag]
  if (!set || set.size === 0) continue
  const cmds = [...set].sort()

  // Si no existe en CATEGORY_META, lo crea en mayusculas bold
  const nombreCat = CATEGORY_META[tag] || `✨ 𝗗𝗜𝗠𝗘𝗡𝗦𝗜𝗢𝗡 𝗗𝗘 𝗟𝗔 ${tag.toUpperCase()}`
  const icono = ICONOS_CATEGORIA[tag] || EMOJIS_RANDOM[Math.floor(Math.random() * EMOJIS_RANDOM.length)]

  menuTexto += `\n╭─「 ${nombreCat} 」─💚─╮\n`
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