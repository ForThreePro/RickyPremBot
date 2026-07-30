import { getBotConfig } from '../lib/botconfig.js'

let linkRegex = /https:\/\/chat\.whatsapp\.com\/([0-9A-Za-z]{20,24})/i;

let handler = async (m, { conn, text, isOwner }) => {
  const botname = getBotConfig(conn, 'botname')

    if (!text) return m.reply(`╭─💚 *『 𝗥𝗜𝗖𝗞𝗬 𝗘𝗥𝗢𝗥 』* 💚─╮
│ 😿 *INSTRUCCION*
│
│ *Debes enviar una invitacion para que*
│ *${botname}* *se una al grupo bro*
╰─────────────────💚`);

    let [_, code] = text.match(linkRegex) || [];

    if (!code) return m.reply(`╭─💚 *『 𝗥𝗜𝗖𝗞𝗬 𝗘𝗥𝗢𝗥 』* 💚─╮
│ 😿 *VALIDACION*
│
│ *Enlace de invitacion no valido*
╰─────────────────💚`);

    if (isOwner) {
        await conn.groupAcceptInvite(code)
            .then(res => m.reply(`╭─💚 *『 𝗥𝗜𝗖𝗞𝗬 𝗣𝗥𝗘𝗠 』* 💚─╮
│ ✅ *ACCESO CONCEDIDO*
╰─────────────────💚

╭─「 𝗥𝗘𝗣𝗢𝗥𝗧𝗘 」─💚─╮
│ *Me he unido exitosamente al grupo*
│ *Portal abierto bro*
╰─────────────────💚`))
            .catch(err => m.reply(`╭─💚 *『 𝗥𝗜𝗖𝗞𝗬 𝗘𝗥𝗢𝗥 』* 💚─╮
│ 😿 *ERROR CRITICO* ❌
╰─────────────────💚

╭─「 𝗗𝗘𝗧𝗔𝗟𝗘 」─💚─╮
│ *Error al unirme al grupo*
│ *Verifica el enlace bro*
╰─────────────────💚`));
    } else {
        let message = `╭─💚 *『 𝗥𝗜𝗖𝗞𝗬 𝗦𝗢𝗟𝗜𝗖𝗜𝗧𝗨𝗗 』* 💚─╮
│ 📨 *SOLICITUD DE INGRESO*
╰─────────────────💚

╭─「 𝗗𝗘𝗧𝗔𝗟𝗘 」─💚─╮
│ *ENLACE:* ${text}
│ *POR:* @${m.sender.split('@')[0]}
╰─────────────────💚`;
        await conn.sendMessage(`${suittag}` + '@s.whatsapp.net', { text: message, mentions: [m.sender] }, { quoted: m });
        m.reply(`╭─💚 *『 𝗥𝗜𝗖𝗞𝗬 𝗣𝗥𝗘𝗠 』* 💚─╮
│ 📤 *SOLICITUD ENVIADA*
╰─────────────────💚

╭─「 𝗘𝗦𝗧𝗔𝗗𝗢 」─💚─╮
│ *El link del grupo ha sido enviado*
│ *Espera la aprobacion del owner bro*
╰─────────────────💚`, null, { mentions: [m.sender] });
    }
};

handler.help = ['invite'];
handler.tags = ['owner'];
handler.command = ['invite', 'join'];

export default handler;