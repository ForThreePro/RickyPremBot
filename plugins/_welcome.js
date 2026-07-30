import { WAMessageStubType } from '@whiskeysockets/baileys';

export async function before(m, { conn, participants, groupMetadata }) {
    if (!m.messageStubType ||!m.isGroup) return true;

    const chat = global.db.data.chats[m.chat];
    if (!chat.welcome) return true;

    const target = m.messageStubParameters?.[0];
    if (!target) return true;

    const userData = global.db.data.users[target] || {};
    const targetName = userData.name || await conn.getName(target) || `@${target.split('@')[0]}`;

    const actor = m.participant || m.key.participant || m.messageStubParameters?.[1] || null;

    let memberCount = participants.length;
    if (m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_ADD) memberCount++;
    if ([WAMessageStubType.GROUP_PARTICIPANT_REMOVE, WAMessageStubType.GROUP_PARTICIPANT_LEAVE].includes(m.messageStubType)) memberCount--;

    const actionText = {
        [WAMessageStubType.GROUP_PARTICIPANT_ADD]:
            actor? `Reclutado por @${actor.split('@')[0]}` : 'Ingreso al sistema',

        [WAMessageStubType.GROUP_PARTICIPANT_REMOVE]:
            actor? `Eliminado por @${actor.split('@')[0]}` : 'Expulsado del sistema',

        [WAMessageStubType.GROUP_PARTICIPANT_LEAVE]:
            'Abandono el sistema'
    };

    const format = (text) => {
        return text
       .replace('@user', `@${target.split('@')[0]}`)
       .replace('@name', targetName)
       .replace('@group', groupMetadata.subject)
       .replace('@desc', groupMetadata.desc?.toString() || 'Sin descripción')
       .replace('%users', memberCount)
       .replace('@action', actionText[m.messageStubType] || '')
       .replace('@date', new Date().toLocaleString('es-PE'));
    };

    // DETECTAR SI TIENE FOTO O NO
    let ppUrl;
    try {
        ppUrl = await conn.profilePictureUrl(target, 'image');
    } catch {
        // Si no tiene foto, usa tu banner RICKY
        ppUrl = 'https://files.evogb.win/60yIxv.jpg'
    }

    const welcome = format(`
╭─💚 *『 𝗥𝗜𝗖𝗞𝗬 𝗣𝗥𝗘𝗠 』* 💚─╮
│ 🧪 *NUEVO OPERATIVO DETECTADO*
╰─────────────────💚

🆔 *NOMBRE:* @name
👥 *GRUPO:* @group

📡 *ESTADO:* @action

╭─「 𝗜𝗡𝗙𝗢 𝗗𝗘𝗟 𝗦𝗜𝗦𝗧𝗘𝗠𝗔 」─💚─╮
│ 📜 *DESC:* @desc
│ 👥 *MIEMBROS:* %users
│ ⚠️ *ADVERTENCIA:* Lee reglas o ban
╰─────────────────💚

> *"Wubba Lubba Dub Dub... Bienvenido bro"*`
   .trim());

    const bye = format(`
╭─💚 *『 𝗥𝗜𝗖𝗞𝗬 𝗣𝗥𝗘𝗠 』* 💚─╮
│ 😿 *OPERATIVO DADO DE BAJA*
╰─────────────────💚

🆔 *NOMBRE:* @name
👥 *GRUPO:* @group

📡 *ESTADO:* @action

╭─「 𝗥𝗘𝗣𝗢𝗥𝗧𝗘 」─💚─╮
│ 👥 *MIEMBROS ACTUALES:* %users
│ 🕐 *SALIDA:* @date
╰─────────────────💚

> *"Un portal menos bro... el sistema sigue"*`
   .trim());

    const mentions = [target];
    if (actor) mentions.push(actor);

    const context = {
        contextInfo: {
            mentionedJid: mentions,
            isForwarded: true
        }
    };

    if (m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_ADD) {
        await conn.sendMessage(m.chat, {
            image: { url: ppUrl },
            caption: welcome,
       ...context
        });
    }

    if ([WAMessageStubType.GROUP_PARTICIPANT_LEAVE, WAMessageStubType.GROUP_PARTICIPANT_REMOVE].includes(m.messageStubType)) {
        await conn.sendMessage(m.chat, {
            image: { url: ppUrl },
            caption: bye,
       ...context
        });
    }
}