import fs from 'fs'
import { join } from 'path'
import { exec } from 'child_process'
import { promisify } from 'util'
const execAsync = promisify(exec)

// FUNCION PARA GUARDAR AUDIO EN MP3
const saveAudio = async (m, type) => {
  let q = m.quoted
  let mime = (q.msg || q).mimetype || q.mimetype || ''
  if (!/audio/.test(mime)) return m.reply(`╭━━━『 💼 RICKY PREM BOT 』━━━╮\n│ ⚠️ *ARCHIVO NO VÁLIDO*\n│ *Responde a un audio*\n╰━━━━━━━━━━💼`);

  let chat = global.db.data.chats[m.chat] || {}
  let buffer = await q.download()
  let tempFile = join('./temp', `${m.chat}_temp_${Date.now()}.ogg`)
  let fileName = join('./temp', `${m.chat}_${type}_${Date.now()}.mp3`)
  if (!fs.existsSync('./temp')) fs.mkdirSync('./temp')
  fs.writeFileSync(tempFile, buffer)

  await execAsync(`ffmpeg -y -i "${tempFile}" -vn -ar 44100 -ac 2 -b:a 128k -c:a libmp3lame -id3v2_version 3 -metadata ptt="" "${fileName}"`)
  fs.unlinkSync(tempFile)

  chat[`${type}Audio`] = fileName
  global.db.data.chats[m.chat] = chat
  await global.db.write()
  return fileName
}

let handler = async (m, { conn, text, command, isAdmin }) => {
  if (!isAdmin) return m.reply(`╭━━━『 💼 RICKY PREM BOT 』━━━╮\n│ 🔒 *ACCESO DENEGADO*\n│ *Solo Administradores*\n╰━━━━━━━━━━💼`);

  let chat = global.db.data.chats[m.chat] || {}

  switch(command) {
    case 'setwelcome':
      if (!text) return m.reply(`╭━━━『 💼 RICKY PREM BOT 』━━━╮
│ ⚠️ *FALTA TEXTO*
│
│ *Ejemplo:* .setwelcome @name ingreso a @group
│ *Variables:* @user @name @group @desc %users @action @date
╰━━━━━━━━━━💼`);
      chat.welcomeText = text;
      global.db.data.chats[m.chat] = chat
      await global.db.write()
      return m.reply(`╭━━━『 💼 RICKY PREM BOT 』━━━╮
│ ✅ *MENSAJE DE BIENVENIDA GUARDADO*
╰━━━━━━━━━━💼

╭─「 📊 PREVISUALIZACION 」─💼─╮
│ ${text}
╰──────────────────💼

> *"Nuevo operador registrado en el sistema"*`);

    case 'setbye':
      if (!text) return m.reply(`╭━━━『 💼 RICKY PREM BOT 』━━━╮
│ ⚠️ *FALTA TEXTO*
│
│ *Ejemplo:* .setbye @name salio de @group
│ *Variables:* @user @name @group %users @action @date
╰━━━━━━━━━━━━━━━━━━💼`);
      chat.byeText = text;
      global.db.data.chats[m.chat] = chat
      await global.db.write()
      return m.reply(`╭━━━『 💼 RICKY PREM BOT 』━━━╮
│ ✅ *MENSAJE DE DESPEDIDA GUARDADO*
╰━━━━━━━━━━💼

╭─「 📊 PREVISUALIZACION 」─💼─╮
│ ${text}
╰──────────────────💼

> *"Operador dado de baja del sistema"*`);

    case 'delwelcome':
      chat.welcomeText = null;
      global.db.data.chats[m.chat] = chat
      await global.db.write()
      return m.reply(`╭━━━『 💼 RICKY PREM BOT 』━━━╮
│ ✅ *BIENVENIDA ELIMINADA*
│
│ *Restaurado a mensaje por defecto*
╰━━━━━━━━━━━━━━━━━━💼`);

    case 'delbye':
      chat.byeText = null;
      global.db.data.chats[m.chat] = chat
      await global.db.write()
      return m.reply(`╭━━━『 💼 RICKY PREM BOT 』━━━╮
│ ✅ *DESPEDIDA ELIMINADA*
│
│ *Restaurado a mensaje por defecto*
╰━━━━━━━━━━💼`);

    case 'audiowelcome':
      if (!m.quoted) return m.reply(`╭━━━『 💼 RICKY PREM BOT 』━━━╮\n│ ⚠️ *RESPONDE A UN AUDIO*\n╰━━━━━━━━━━💼`);
      await saveAudio(m, 'welcome')
      return m.reply(`╭━━━『 💼 RICKY PREM BOT 』━━━╮\n│ 🎵 *AUDIO MP3 GUARDADO*\n│ *Envio manual activado*\n╰━━━━━━━━━━💼`);

    case 'audiobye':
      if (!m.quoted) return m.reply(`╭━━━『 💼 RICKY PREM BOT 』━━━╮\n│ ⚠️ *RESPONDE A UN AUDIO*\n╰━━━━━━━━━━💼`);
      await saveAudio(m, 'bye')
      return m.reply(`╭━━━『 💼 RICKY PREM BOT 』━━━╮\n│ 🎵 *AUDIO MP3 GUARDADO*\n│ *Envio manual activado*\n╰━━━━━━━━━━💼`);

    case 'delaudiowelcome':
      chat.welcomeAudio = null
      global.db.data.chats[m.chat] = chat
      await global.db.write()
      return m.reply(`╭━━━『 💼 RICKY PREM BOT 』━━━╮\n│ ✅ *AUDIO DE BIENVENIDA ELIMINADO*\n╰━━━━━━━━━━💼`);

    case 'delaudiobye':
      chat.byeAudio = null
      global.db.data.chats[m.chat] = chat
      await global.db.write()
      return m.reply(`╭━━━『 💼 RICKY PREM BOT 』━━━╮\n│ ✅ *AUDIO DE DESPEDIDA ELIMINADO*\n╰━━━━━━━━━━━━━━━━━━💼`);
  }
}

handler.help = [
  'setwelcome <texto>', 
  'setbye <texto>', 
  'delwelcome', 
  'delbye',
  'audiowelcome',
  'audiobye', 
  'delaudiowelcome',
  'delaudiobye'
];
handler.tags = ['group'];
handler.command = /^(setwelcome|setbye|delwelcome|delbye|audiowelcome|audiobye|delaudiowelcome|delaudiobye)$/i;
handler.admin = true;
handler.group = true;

export default handler