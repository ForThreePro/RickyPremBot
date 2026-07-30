let handler = async (m, { conn }) => {
  try {
    const grupoID = m.chat

    await conn.groupRevokeInvite(grupoID)

    const nuevoEnlace = await conn.groupInviteCode(grupoID)
    const enlaceCompleto = 'https://chat.whatsapp.com/' + nuevoEnlace

    await conn.reply(m.sender, 
`╭─💚 *『 𝗥𝗜𝗖𝗞𝗬 𝗣𝗥𝗘𝗠 』* 💚─╮
│ 🧪 *PROTOCOLO EJECUTADO* ✅
╰─────────────────💚

╭─「 𝗥𝗘𝗣𝗢𝗥𝗧𝗘 𝗗𝗘 𝗦𝗘𝗚𝗨𝗥𝗜𝗗𝗔𝗗 」─╮
│ 🔻 *ENLACE ANTERIOR:* Revocado
│ 🔗 *NUEVO ENLACE:* ${enlaceCompleto}
│ 🛡️ *ESTADO:* Sistema Seguro
╰─────────────────────────💚

> *“El acceso anterior ha sido anulado bro”*`, 
      m, { detectLink: true })

    await conn.reply(m.chat, `╭─💚 *『 𝗥𝗜𝗖𝗞𝗬 𝗣𝗥𝗘𝗠 』* 💚─╮
│ 🔒 *ENLACE RESTABLECIDO*
╰─────────────────💚

╭─「 𝗔𝗗𝗩𝗘𝗥𝗧𝗘𝗡𝗖𝗜𝗔 」─╮
│ *El enlace anterior ya no funciona*
│ *Solo el nuevo enlace es válido*
│ *Compártelo con cuidado bro*
╰─────────────────💚`, m)

  } catch (error) {
    console.error(error)
    await m.reply(`╭─💚 *『 𝗥𝗜𝗖𝗞𝗬 𝗘𝗥𝗢𝗥 』* 💚─╮
│ 😿 *ERROR CRÍTICO* ❌
╰─────────────────💚

╭─「 𝗗𝗘𝗧𝗔𝗟𝗘 」─╮
│ ${error.message}
╰─────────────💚

╭─「 𝗦𝗢𝗟𝗨𝗖𝗜𝗢𝗡 」─╮
│ *Verifica que el bot sea admin bro*
│ *Dale permisos para poder ejecutar*
╰─────────────────💚`)
  }
}

handler.help = ['revoke']
handler.tags = ['grupo']
handler.command = ['revoke', 'restablecer']
handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler