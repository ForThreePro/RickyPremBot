
import axios from 'axios'
import fetch from "node-fetch"
import yts from 'yt-search'

let handler = async (m, { conn, text, command, usedPrefix }) => {
    if (!text) return conn.reply(m.chat, `╭─💚 *『 𝗥𝗜𝗖𝗞𝗬 𝗣𝗥𝗘𝗠 』* 💚─╮
│ 🧪 *MODULO:* Descargas
│ 📡 *ESTADO:* Online
╰─────────────────💚

╭─「 *YOUTUBE* 」─╮
│ 🧪.play nombre → Audio
│ 🧪.play2 nombre → Video
│ 🧪.ytmp3 link → Audio Directo
│ 🧪.ytmp4 link → Video 720p
│
╭─「 *SOCIAL* 」─╮
│ 🧪.spotify nombre → Audio
│ 🧪.tiktok link → Video
│ 🧪.tiktoksearch txt → Buscar
│ 🧪.ig link → Instagram
│ 🧪.fb link → Facebook
│ 🧪.mediafire link → Archivo
╰─────────────────💚

> *“Pásame el nombre o link bro”*`, m, {
        contextInfo: {
            externalAdReply: {
                title: 'Ricky Prem Downloader',
                body: '🧪 Powered by Ricky',
                thumbnailUrl: 'https://files.evogb.win/60yIxv.jpg',
                mediaType: 1
            }
        }
    })

    await m.react('⏳')
    const keyEvo = Buffer.from('ZWt1c2Fz', 'base64').toString('utf-8').split('').reverse().join('')
    const keySasuke = Buffer.from('c2FzdWtl', 'base64').toString('utf-8')

    try {
        // ===== PLAY / PLAY2 YOUTUBE BUSQUEDA =====
        if (/^(play|play2)$/i.test(command)) {
            let res = await yts(text)
            let vid = res.videos[0]
            if (!vid) throw 'YT_NOT_FOUND'

            await m.react('🔍')
            await m.react('⏳')

            let isVideo = command === 'play2'
            let apiUrl = isVideo
           ? `https://api.evogb.org/dl/ytmp4?url=${encodeURIComponent(vid.url)}&quality=720&key=${keySasuke}`
                : `https://api.evogb.org/dl/ytmp3?url=${encodeURIComponent(vid.url)}&key=${keySasuke}`

            let json = await (await fetch(apiUrl)).json()
            if (!json.status) throw 'YT_DL_ERROR'

            let cap = `╭─💚 *『 𝗥𝗜𝗖𝗞𝗬 𝗬𝗧 ${isVideo? '𝗩𝗜𝗗𝗘𝗢' : '𝗔𝗨𝗗𝗜𝗢'} 』* 💚─╮
│
│ 📺 *TITULO:* ${vid.title}
│ ⏱️ *DURACION:* ${vid.timestamp}
│ 👤 *AUTOR:* ${vid.author.name}
│ 👀 *VISTAS:* ${vid.views.toLocaleString()}
│ 📦 *FORMATO:* ${isVideo? 'MP4 720p' : 'MP3 320kbps'}
│
╰─────────────────💚

> *“Extrayendo datos de la dimensión C-137”*`

            await conn.sendMessage(m.chat, { image: { url: vid.thumbnail }, caption: cap }, { quoted: m })
            await conn.sendMessage(m.chat, {
                [isVideo? 'video' : 'audio']: { url: json.data.dl },
                mimetype: isVideo? 'video/mp4' : 'audio/mpeg',
                fileName: `${vid.title}.${isVideo? 'mp4' : 'mp3'}`
            }, { quoted: m })
            return await m.react('✅')
        }

        // ===== YTMP3 / YTMP4 DIRECTO =====
        if (/^(ytmp3|ytmp4)$/i.test(command)) {
            let res = await yts(text)
            let vid = res.videos[0]
            if (!vid) throw 'YT_NOT_FOUND'

            await m.react('⏳')

            let isVideo = command === 'ytmp4'
            let apiUrl = isVideo
            ? `https://api.evogb.org/dl/ytmp4?url=${encodeURIComponent(vid.url)}&quality=720&key=${keySasuke}`
                : `https://api.evogb.org/dl/ytmp3?url=${encodeURIComponent(vid.url)}&key=${keySasuke}`

            let json = await (await fetch(apiUrl)).json()
            if (!json.status) throw 'YT_DL_ERROR'

            let cap = `╭─💚 *『 𝗥𝗜𝗖𝗞𝗬 𝗬𝗧 ${isVideo? '𝗩𝗜𝗗𝗘𝗢' : '𝗔𝗨𝗗𝗜𝗢'} 』* 💚─╮
│
│ 📺 *TITULO:* ${vid.title}
│ 📦 *FORMATO:* ${isVideo? 'MP4 720p' : 'MP3'}
│ ⏱️ *DURACION:* ${vid.timestamp}
│ 👀 *VISTAS:* ${vid.views.toLocaleString()}
│
╰─────────────────💚

> *“Descarga iniciada bro”*`

            await conn.sendMessage(m.chat, { image: { url: vid.thumbnail }, caption: cap }, { quoted: m })
            await conn.sendMessage(m.chat, {
                [isVideo? 'video' : 'audio']: { url: json.data.dl },
                mimetype: isVideo? 'video/mp4' : 'audio/mpeg',
                fileName: `${vid.title}.${isVideo? 'mp4' : 'mp3'}`
            }, { quoted: m })
            return await m.react('✅')
        }

        // ===== SPOTIFY =====
        if (/^(spotify)$/i.test(command)) {
            let searchRes = await fetch(`https://api.evogb.org/search/spotify?query=${encodeURIComponent(text)}&key=${keySasuke}`)
            let searchData = await searchRes.json()
            if (!searchData.status ||!searchData.result[0]) throw 'SP_NOT_FOUND'

            await m.react('🔍')
            await m.react('⏳')

            let song = searchData.result[0]
            let dlRes = await fetch(`https://api.evogb.org/dl/spotify?url=${encodeURIComponent(song.link)}&key=${keySasuke}`)
            let dlData = await dlRes.json()
            if (!dlData.status) throw 'SP_DL_ERROR'

            let cap = `╭─💚 *『 𝗥𝗜𝗖𝗞𝗬 𝗦𝗣𝗢𝗧𝗜𝗙𝗬 』* 💚─╮
│
│ 🎵 *TITULO:* ${dlData.data.name}
│ 🎤 *ARTISTA:* ${dlData.data.artist}
│ 💿 *ALBUM:* ${dlData.data.album}
│ ⏱️ *DURACION:* ${dlData.data.duration}
│ 📅 *AÑO:* ${dlData.data.year}
│
╰─────────────────💚

> *“Música procesada con portal gun”*`

            await conn.sendMessage(m.chat, { image: { url: dlData.data.image }, caption: cap }, { quoted: m })
            await conn.sendMessage(m.chat, { audio: { url: dlData.data.url }, mimetype: 'audio/mpeg', fileName: `${dlData.data.name}.mp3` }, { quoted: m })
            return await m.react('✅')
        }

        // ===== TIKTOK =====
        if (/^(tiktok|tiktoksearch)$/i.test(command)) {
            if (command === 'tiktoksearch') {
                let res = await (await fetch(`https://api.evogb.org/search/tiktok?query=${text}&key=${keySasuke}`)).json()
                let video = res.data[0]
                if (!video) throw 'TT_NOT_FOUND'

                let caption = `╭─💚 *『 𝗥𝗜𝗖𝗞𝗬 𝗧𝗜𝗞𝗧𝗢𝗞 』* 💚─╮
│
│ 📺 *TITULO:* ${video.title}
│ 👤 *AUTOR:* ${video.author.nickname}
│ 👀 *VISTAS:* ${video.play_count.toLocaleString()}
│ ❤️ *LIKES:* ${video.digg_count.toLocaleString()}
│
╰─────────────────💚

> *“Video encontrado en otra dimensión”*`
                await conn.sendFile(m.chat, video.dl, 'tiktok.mp4', caption, m)
            } else {
                let res = await (await fetch(`https://api.evogb.org/dl/tiktok?url=${text}&key=${keySasuke}`)).json()
                let data = res.data
                if (!data) throw 'TT_DL_ERROR'

                let caption = `╭─💚 *『 𝗥𝗜𝗖𝗞𝗬 𝗧𝗜𝗞𝗧𝗢𝗞 』* 💚─╮
│
│ 📺 *TITULO:* ${data.title}
│ 👤 *AUTOR:* ${data.author.nickname}
│
╰─────────────────💚

> *“Descarga completa bro”*`
                await conn.sendFile(m.chat, Array.isArray(data.dl)? data.dl[0] : data.dl, 'tiktok.mp4', caption, m)
            }
            return await m.react('✅')
        }

        // ===== INSTAGRAM =====
        if (/^(ig|instagram)$/i.test(command)) {
            const { data } = await axios.get(`https://api.evogb.org/dl/instagram?url=${encodeURIComponent(text)}&key=${keyEvo}`)
            if (!data.status) throw 'IG_ERROR'
            let media = data.data[0]
            let type = media.type === 'video'? 'VIDEO' : 'IMAGEN'

            let cap = `╭─💚 *『 𝗥𝗜𝗖𝗞𝗬 𝗜𝗡𝗦𝗧𝗔𝗚𝗥𝗔𝗠 』* 💚─╮
│
│ 📸 *TIPO:* ${type}
│ 📡 *ESTADO:* Enviando
│
╰─────────────────💚

> *“Contenido capturado bro”*`

            await conn.sendMessage(m.chat, {
                [media.type === 'video'? 'video' : 'image']: { url: media.url },
                mimetype: media.type === 'video'? 'video/mp4' : 'image/jpeg',
                caption: cap
            }, { quoted: m })
            return await m.react('✅')
        }

        // ===== FACEBOOK =====
        if (/^(fb|facebook)$/i.test(command)) {
            const { data } = await axios.get(`https://api.evogb.org/dl/facebook?url=${encodeURIComponent(text)}&key=${keyEvo}`)
            if (!data.status) throw 'FB_ERROR'
            let video = data.resultados[0]

            let cap = `╭─💚 *『 𝗥𝗜𝗖𝗞𝗬 𝗙𝗔𝗖𝗘𝗕𝗢𝗞 』* 💚─╮
│
│ 📺 *CALIDAD:* ${video.calidad || 'HD'}
│ 📡 *ESTADO:* Enviando
│
╰─────────────────💚

> *“Video extraído bro”*`

            await conn.sendMessage(m.chat, {
                video: { url: video.url },
                mimetype: 'video/mp4',
                caption: cap
            }, { quoted: m })
            return await m.react('✅')
        }

        // ===== MEDIAFIRE =====
        if (/^(mediafire|mf|mediafiredl)$/i.test(command)) {
            let response = await fetch(`https://api.evogb.org/dl/mediafire?url=${encodeURIComponent(text)}&key=${keySasuke}`)
            let result = await response.json()
            if (!result.status ||!result.data) throw 'MF_ERROR'

            let { name, size, date, dl } = result.data
            let caption = `╭─💚 *『 𝗥𝗜𝗖𝗞𝗬 𝗠𝗘𝗗𝗜𝗔𝗙𝗜𝗥𝗘 』* 💚─╮
│
│ 📦 *NOMBRE:* ${name}
│ 💾 *TAMAÑO:* ${size}
│ 📅 *FECHA:* ${date}
│
╰─────────────────💚

> *“Archivo extraído bro”*`

            await conn.sendFile(m.chat, dl, name, caption, m)
            return await m.react('✅')
        }

    } catch (e) {
        console.error(e)
        await m.react('❌')
        let msgs = {
            YT_NOT_FOUND: 'No se encontró el video bro',
            YT_DL_ERROR: 'Error en YouTube',
            SP_NOT_FOUND: `No hay resultados: ${text}`,
            SP_DL_ERROR: 'Error en Spotify',
            TT_NOT_FOUND: 'No hay resultados TT',
            TT_DL_ERROR: 'Error en TikTok',
            IG_ERROR: 'Error en Instagram',
            FB_ERROR: 'Error en Facebook',
            MF_ERROR: 'Archivo no encontrado'
        }
        m.reply(`╭─💚 *『 𝗥𝗜𝗖𝗞𝗬 𝗘𝗥𝗢𝗥 』* 💚─╮
│ 😿 *ERROR DE SISTEMA*
│
├─ *DETALLE:* ${msgs[e] || 'Error inesperado'}
├─ *ACCION:* Verifica el enlace bro
│
╰─────────────────💚`)
    }
}

handler.help = ['play', 'play2', 'ytmp3', 'ytmp4', 'spotify', 'tiktok', 'tiktoksearch', 'ig', 'fb', 'mediafire']
handler.tags = ['downloader']
handler.command = /^(play|play2|ytmp3|ytmp4|spotify|tiktok|tiktoksearch|ig|instagram|fb|facebook|mediafire|mf|mediafiredl)$/i

export default handler