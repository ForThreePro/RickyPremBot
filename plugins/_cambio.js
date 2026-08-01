import fetch from 'node-fetch'

const MARCA = 'RICKI PREM BOT 🧪'
const TZ = 'America/Lima'

let handler = async (m, { conn, text }) => {
  await conn.sendMessage(m.chat, { react: { text: '🧪', key: m.key } }).catch(_=>{})

  if (!text ||!text.includes('/')) {
    return m.reply(`╭─🧪─❒ *『 𝗥𝗜𝗖𝗞𝗜 𝗣𝗥𝗘𝗠 𝗕𝗢𝗧 』* ❒─🧪─╮
│
│ *💱 CASA DE CAMBIOS INTERDIMENSIONAL* 💱
│
│ *USO:*
│.cambio [monto] / [CODIGO] / [CODIGO]
│
│ *EJEMPLOS:*
│.cambio 100 / PEN / USD → Tasa Oficial
│.cambio 100 / USD / ARS → BLUE 🇦🇷
│.cambio 100 / ARS / PEN → BLUE Inverso 🇦🇷
│
│ *MONEDAS:* PEN, USD, EUR, ARS, COP, MXN, BRL...
│
│ > *¡Wubba Lubba Dub Dub! Yo convierto más rápido que un portal* ⚡
╰─────────────────────────🧪`)
  }

  let [montoStr, de, a] = text.split('/').map(v => v.trim().toUpperCase())
  let monto = parseFloat(montoStr.replace(/,/g, ''))

  if (isNaN(monto) || monto <= 0) return m.reply(`⚠️ *¡BRO, ESO NO ES UN NÚMERO!* Necesito un monto real, no del universo C-137 😤`)
  if (de.length!== 3 || a.length!== 3) return m.reply(`⚠️ *Usa códigos de 3 letras genio:* PEN, USD, ARS`)
  if (de === a) return m.reply(`✅ *${monto} ${de}* = *${monto} ${a}* \n*¡No hay intercambio interdimensional aquí!*`)

  try {
    let tasaUSD_ARS = null
    let tipoTasa = 'OFICIAL'

    if (de === 'ARS' || a === 'ARS') {
      let resBlue = await fetch('https://dolarapi.com/v1/dolares/blue')
      let jsonBlue = await resBlue.json()
      if(!jsonBlue.venta) throw new Error('API Blue colapsó en otra dimensión')
      tasaUSD_ARS = jsonBlue.venta
      tipoTasa = 'BLUE 🔵'
    }

    let total
    if (de === 'USD' && a === 'ARS') total = (monto * tasaUSD_ARS).toFixed(2)
    else if (de === 'ARS' && a === 'USD') total = (monto / tasaUSD_ARS).toFixed(2)
    else if (de === 'ARS') {
      let res = await fetch(`https://api.exchangerate-api.com/v4/latest/USD`)
      let json = await res.json()
      total = ((monto / tasaUSD_ARS) * json.rates[a]).toFixed(2)
    }
    else if (a === 'ARS') {
      let res = await fetch(`https://api.exchangerate-api.com/v4/latest/${de}`)
      let json = await res.json()
      total = ((monto * json.rates.USD) * tasaUSD_ARS).toFixed(2)
    }
    else {
      let res = await fetch(`https://api.exchangerate-api.com/v4/latest/${de}`)
      let json = await res.json()
      if(!json.rates[a]) throw new Error('Moneda no existe ni en el multiverso')
      total = (monto * json.rates[a]).toFixed(2)
    }

    let fecha = new Date().toLocaleDateString('es-PE', { timeZone: TZ })

    let txt = `╭─🧪─❒ *『 𝗥𝗜𝗖𝗞𝗜 𝗣𝗥𝗘𝗠 𝗕𝗢𝗧 』* ❒─🧪─╮
│
│ *💰 CONVERSIÓN INTERDIMENSIONAL* 💰
│ ${monto} *${de}*
│ ⬇️ *¡ABRIENDO PORTAL!* 🌀
│ *${total}* *${a}*
│
│ *📊 TASA:* ${tipoTasa}
${tasaUSD_ARS? `│ *1 USD* = *${tasaUSD_ARS}* ARS` : ''}
│ *📅 FECHA:* ${fecha}
│
╰─────────────────────────🧪
> *${MARCA}* | Datos sincronizados con el multiverso`

    m.reply(txt)

  } catch(e) {
    console.log(e)
    m.reply(`⚠️ *ERROR INTERDIMENSIONAL:* ${e.message}\n\n*Revisa los códigos bro:* PEN, USD, ARS, COP...`)
  }
}

handler.help = ['cambio ( Monedas )']
handler.tags = ['finanzas']
handler.command = /^cambio$/i
handler.group = true
export default handler