let poin = 10000
const similarity = require('similarity');
const threshold = 0.72
let handler = m => m
handler.before = async function (m) {
    let id = m.chat
    let users = global.db.data.users[m.sender]
    if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !/Ketik.*susn/i.test(m.quoted.text)) return !0
    this.susun = this.susun ? this.susun : {}
    if (!(id in this.susun)) return m.reply('Soal itu telah berakhir')
    if (m.quoted.id == this.susun[id][0].id) {
        let json = JSON.parse(JSON.stringify(this.susun[id][1]))
        if (m.text.toLowerCase() == json.jawaban.toLowerCase().trim()) {
            global.db.data.users[m.sender].exp += this.susun[id][2]
            users.money += poin
            m.reply(`*Benar!*\n+${this.susun[id][2]} money`)
            clearTimeout(this.susun[id][3])
            delete this.susun[id]
        } else if (similarity(m.text.toLowerCase(), json.jawaban.toLowerCase().trim()) >= threshold) m.reply(`*Dikit Lagi!*`)
        else m.reply(`*Salah!*`)
    }
    return !0
}
handler.exp = 0

module.exports = handler