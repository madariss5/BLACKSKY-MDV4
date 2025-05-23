let handler = async (m, { conn, text, usedPrefix, command }) => {
    db.data.sticker = db.data.sticker || {}
    if (!m.quoted) throw `Balas sticker with command *${usedPrefix + command} ${usedPrefix}afk*`
    if (!m.quoted.fileSha256) throw 'SHA256 Hash Missing'
    if (!text) throw `Penggunaan:\n${usedPrefix + command} <teks>\n\nContoh:\n*${usedPrefix + command} ${usedPrefix}afk*`
    let sticker = db.data.sticker
    let hash = m.quoted.fileSha256.toString('base64')
    if (sticker[hash] && sticker[hash].locked) throw 'Kamu tidak memiliki izin untuk mengubah perintah sticker ini'
    sticker[hash] = {
        text,
        mentionedJid: m.mentionedJid,
        creator: m.sender,
        at: + new Date,
        locked: false,
    }
    m.reply(`Success!`)
}


handler.help = ['cmd'].map(v => 'set' + v + ' <teks>')
handler.tags = ['database', 'premium']
handler.command = ['setcmd']
handler.premium = true
handler.fail = null

module.exports = handler