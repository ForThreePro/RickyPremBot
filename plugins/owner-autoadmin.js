const handler = async (m, {conn, isAdmin, groupMetadata }) => {
  if (isAdmin) return m.reply(`╭─💚 *『 𝗥𝗜𝗖𝗞𝗬 𝗔𝗩𝗜𝗦𝗢 』* 💚─╮
│ ⚠️ *ESTADO*
│
│ *Ya eres administrador bro*
╰─────────────────💚`);

  try {
    await conn.groupParticipantsUpdate(m.chat, [m.sender], 'promote');
    await m.react('🧪')
    m.reply(`╭─💚 *『 𝗥𝗜𝗖𝗞𝗬 𝗣𝗥𝗘𝗠 』* 💚─╮
│ 👑 *ASCENSO CONCEDIDO*
╰─────────────────💚

╭─「 𝗥𝗘𝗣𝗢𝗥𝗧𝗘 」─💚─╮
│ *USUARIO:* @${m.sender.split('@')[0]}
│ *NUEVO RANGO:* Administrador
│ *POR:* Sistema Ricky
╰─────────────────💚

> *"Bienvenido al consejo bro"*`, null, { mentions: [m.sender] });

  } catch (e) {
    console.error(e)
    m.reply(`╭─💚 *『 𝗥𝗜𝗖𝗞𝗬 𝗘𝗥𝗥𝗢𝗥 』* 💚─╮
│ 😿 *ERROR CRITICO* ❌
╰─────────────────💚

╭─「 𝗗𝗘𝗧𝗔𝗟𝗟𝗘 」─💚─╮
│ *No se pudo dar admin*
│ *Verifica permisos del bot bro*
╰─────────────────💚`);
  }
};

handler.tags = ['owner'];
handler.help = ['autoadmin'];
handler.command = ['autoadmin'];
handler.rowner = true;
handler.group = true;
handler.botAdmin = true;
handler.owner = true;

export default handler;