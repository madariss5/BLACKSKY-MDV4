const { getMessage } = require('../lib/languages');

let handler = async (m, { text, usedPrefix, command }) => {
    if (!text) throw `uhm.. teksnya mana?\n\nUseran:\n${usedPrefix + command} <teks>\n\nExample:\n${usedPrefix + command} plugins/menu.js`
    if (!m.quoted.text) throw `balas message nya!`
    let path = `${text}`
    await require('fs').writeFileSync(path, m.quoted.text)
    m.reply(`tersimpan di ${path}`)
}
handler.help = ['sf'].map(v => v + ' <teks>')
handler.tags = ['owner']
handler.command = /^sf$/i

handler.rowner = true

module.exports = handler
