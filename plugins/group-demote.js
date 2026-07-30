import { getBotConfig } from '../lib/botconfig.js'

const handler = async (m, { conn, command }) => {
  try {
    const jid = (id) => id?.includes('@')? id : `${id}@s.whatsapp.net`
    let who =
      m.mentionedJid?.[0] ||
      m.msg?.contextInfo?.mentionedJid?.[0] ||
      m.quoted?.sender ||
      null

    if (!who) {
      return conn.reply(m.chat, `╭─💚 *『 𝗥𝗜𝗖𝗞𝗬 𝗘𝗥𝗢𝗥 』* 💚─╮
│ 😿 *INSTRUCCION*
│
│ *Menciona o cita al usuario bro*
╰─────────────────💚`, m)
    }

    who = jid(who)

    const groupMetadata = await conn.groupMetadata(m.chat)
    const participant = groupMetadata.participants.find(
      p => jid(p.id || p.jid) === who
    )

    const isPromote = command === 'promote'
    const protectedOwners = global.owner.map(
      o => o[0] + '@s.whatsapp.net'
    )
    const targetName = await conn.getName(who)

    if (isPromote) {
      if (participant?.admin) {
        return conn.reply(m.chat, `╭─💚 *『 𝗥𝗜𝗖𝗞𝗬 𝗔𝗩𝗜𝗦𝗢 』* 💚─╮
│ ⚠️ *ESTADO*
│
│ @${who.split('@')[0]} *ya es admin bro*
╰─────────────────💚`, m, { mentions: [who] })
      }

      await conn.groupParticipantsUpdate(m.chat, [who], 'promote')

      return conn.reply(m.chat, `╭─💚 *『 𝗥𝗜𝗖𝗞𝗬 𝗣𝗥𝗘𝗠 』* 💚─╮
│ 👑 *ASCENSO EJECUTADO* ✅
╰─────────────────💚

╭─「 𝗥𝗘𝗣𝗢𝗥𝗧𝗘 」─💚─╮
│ *USUARIO:* @${who.split('@')[0]}
│ *NUEVO RANGO:* Administrador
│ *POR:* @${m.sender.split('@')[0]}
╰─────────────────💚

> *"Con gran poder viene gran responsabilidad bro"*`, m, { mentions: [who, m.sender] })
    }

    // DEMOTE
    if (protectedOwners.includes(who)) {
      return conn.reply(m.chat, `╭─💚 *『 𝗥𝗜𝗖𝗞𝗬 𝗦𝗘𝗚𝗨𝗥𝗜𝗗𝗔𝗗 』* 💚─╮
│ ⛔ *ACCESO DENEGADO*
│
│ *No se puede degradar al owner bro*
╰─────────────────💚`, m)
    }

    if (!participant?.admin) {
      return conn.reply(m.chat, `╭─💚 *『 𝗥𝗜𝗖𝗞𝗬 𝗔𝗩𝗜𝗦𝗢 』* 💚─╮
│ ⚠️ *ESTADO*
│
│ @${who.split('@')[0]} *no es admin*
╰─────────────────💚`, m, { mentions: [who] })
    }

    if (who === groupMetadata.owner) {
      return conn.reply(m.chat, `╭─💚 *『 𝗥𝗜𝗖𝗞𝗬 𝗦𝗘𝗚𝗨𝗥𝗜𝗗𝗔𝗗 』* 💚─╮
│ ⛔ *ACCESO DENEGADO*
│
│ *No se puede degradar al creador*
╰─────────────────💚`, m)
    }

    if (who === conn.user.jid) {
      return conn.reply(m.chat, `╭─💚 *『 𝗥𝗜𝗖𝗞𝗬 𝗦𝗘𝗚𝗨𝗥𝗜𝗗𝗔𝗗 』* 💚─╮
│ ⛔ *ACCESO DENEGADO*
│
│ *No puedo degradarme a mi mismo bro*
╰─────────────────💚`, m)
    }

    await conn.groupParticipantsUpdate(m.chat, [who], 'demote')

    return conn.reply(m.chat, `╭─💚 *『 𝗥𝗜𝗖𝗞𝗬 𝗣𝗥𝗘𝗠 』* 💚─╮
│ 🔻 *DEGRADACION EJECUTADA* ❌
╰─────────────────💚

╭─「 𝗥𝗘𝗣𝗢𝗥𝗧𝗘 」─💚─╮
│ *USUARIO:* @${who.split('@')[0]}
│ *NUEVO RANGO:* Miembro
│ *POR:* @${m.sender.split('@')[0]}
╰─────────────────💚

> *"Sin rango, sin poder bro"*`, m, { mentions: [who, m.sender] })

  } catch (e) {
    conn.reply(m.chat, `╭─💚 *『 𝗥𝗜𝗖𝗞𝗬 𝗘𝗥𝗢𝗥 』* 💚─╮
│ 😿 *ERROR CRITICO*
│
├─ *DETALLE:* ${e.message}
│
╰─────────────────💚`, m)
  }
}

handler.help = ['promote', 'demote']
handler.tags = ['group']
handler.command = ['promote', 'demote']
handler.admin = true
handler.botAdmin = true

export default handler