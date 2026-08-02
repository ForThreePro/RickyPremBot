let handler = async (m, { conn }) => {
    let vcard = `BEGIN:VCARD
VERSION:3.0
N:;Ricky;;;
FN:Ricky
ORG:𝐑𝐈𝐂𝐊𝐘 𝐏𝐑𝐄𝐌 𝐁𝐎𝐓
TEL;type=CELL;type=VOICE;waid=15812903813:+1 581 290 3813
END:VCARD`

    await conn.sendMessage(m.chat, {
        contacts: {
            displayName: 'Ricky',
            contacts: [{ vcard }]
        }
    }, { quoted: m })

    await conn.reply(m.chat, `😎⚡ *𝐁𝐎𝐓 𝐑𝐈𝐂𝐊𝐘 𝐏𝐑𝐄𝐌*

╭─「 👑 𝐂𝐑𝐄𝐀𝐃𝐎𝐑 」─╮
│
│ *𝐍𝐎𝐌𝐁𝐑𝐄:* 𝐑𝐢𝐜𝐤𝐲
│ *𝐄𝐒𝐓𝐀𝐃𝐎:* 𝐄𝐧 𝐥𝐢𝐧𝐞𝐚 24/7 ⚡
│
╰─────────────────╯

> 𝐄𝐬𝐜𝐫𝐢𝐛𝐞 𝐭𝐫𝐚𝐧𝐪𝐮𝐢𝐥𝐨 𝐧𝐨 𝐦𝐮𝐞𝐫𝐝𝐨 😎`, m)
}

handler.help = ['owner']
handler.tags = ['info']
handler.command = ['owner']
export default handler