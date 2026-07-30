let handler = async (m, { conn, usedPrefix, command }) => {

if (!m.quoted) return conn.reply(m.chat, `╭─💚 *『 𝗥𝗜𝗖𝗞𝗬 𝗘𝗥𝗢𝗥 』* 💚─╮
│ 😿 *INSTRUCCION*
│ 
│ *Cita el mensaje que deseas eliminar bro*
╰─────────────────💚`, m)

try {
    // Caso 1: Mensaje de otro usuario
    let key = m.quoted.vM.key
    await conn.sendMessage(m.chat, { delete: key })
    await conn.sendMessage(m.chat, { react: { text: '🧪', key: m.key } })

} catch (e) {
    // Caso 2: Fallback si falla
    try {
        let delet = m.quoted.vM.key
        await conn.sendMessage(m.chat, { delete: delet })
    } catch {
        return conn.reply(m.chat, `╭─💚 *『 𝗥𝗜𝗖𝗞𝗬 𝗘𝗥𝗢𝗥 』* 💚─╮
│ 😿 *FALLO*
│ 
│ *No se pudo eliminar el mensaje bro*
│ *Verifica permisos de admin*
╰─────────────────💚`, m)
    }
}}

handler.help = ['delete']
handler.tags = ['group']
handler.command = ['del','delete','d']
handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler