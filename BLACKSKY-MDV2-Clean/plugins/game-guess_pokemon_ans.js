const { getMessage } = require('../lib/languages');

let poin = 10000

const threshold = 0.72
let handler = m => m
handler.before = async function (m) {
  let id = m.chat
  let users = global.db.data.users[m.sender]
  if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !/Type.*tebpo/i.test(m.quoted.text)) return !0
  this.tebakpokemon = this.tebakpokemon ? this.tebakpokemon : {}
  if (!(id in this.tebakpokemon)) return m.reply('Soal that has berakhir')
  if (m.quoted.id == this.tebakpokemon[id][0].id) {
    let json = JSON.parse(JSON.stringify(this.tebakpokemon[id][1]))
    // m.reply(JSON.stringify(json, null, '\t'))
    if (m.text.toLowerCase() == json.jawaban.toLowerCase().trim()) {
      global.db.data.users[m.sender].exp += this.tebakpokemon[id][2]
      global.db.data.users[m.sender].ticketcoin += 1
      users.money += poin
      m.reply(`*Benar!*\n+${this.tebakpokemon[id][2]} money`)
      clearTimeout(this.tebakpokemon[id][3])
      delete this.tebakpokemon[id]
    } else if ((m.text.toLowerCase(), json.jawaban.toLowerCase().trim()) >= threshold) m.reply(`*Dikit Lagi!*`)
    else m.reply(`*Salah!*`)
  }
  return !0
}
handler.exp = 0

module.exports = handler