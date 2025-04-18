const { getMessage } = require('../lib/languages');

let handler = async (m, { conn, args, participants }) => {
    // Get user's preferred language
    const user = global.db.data.users[m.sender];
    const chat = global.db.data.chats[m.chat];
    const lang = user?.language || chat?.language || global.language;
 {
    let users = Object.entries(global.db.data.users).map(([key, value]) => {
      return {...value, jid: key}
    })
    let sortedExp = users.map(toNumber('exp')).sort(sort('exp'))
    let sortedLim = users.map(toNumber('limit')).sort(sort('limit'))
    let sortedLevel = users.map(toNumber('level')).sort(sort('level'))
    let sortedMoney = users.map(toNumber('money')).sort(sort('money'))
    let sortedDiamond = users.map(toNumber('diamond')).sort(sort('diamond'))
    let sortedBank = users.map(toNumber('bank')).sort(sort('bank'))
    let usersExp = sortedExp.map(enumGetKey)
    let usersLim = sortedLim.map(enumGetKey)
    let usersLevel = sortedLevel.map(enumGetKey)
    let usersMoney = sortedMoney.map(enumGetKey)
    let usersDiamond = sortedDiamond.map(enumGetKey)
    let usersBank = sortedBank.map(enumGetKey)
    console.log(participants)  
    let len = args[0] && args[0].length > 0 ? Math.min(10, Math.max(parseInt(args[0]), 10)) : Math.min(10, sortedExp.length)
    let text = `
  • *XP Leaderboard Top ${len}* •
  Kamu: *${usersExp.indexOf(m.name) + 1}* dari *${usersExp.length}*
  
  ${sortedExp.slice(0, len).map(({ jid, exp }, i) => `${i + 1}. ${participants.some(p => jid === p.jid) ? `(${conn.getName(jid)}) wa.me/` : '@'}${jid.split`@`[0]} *${exp} Exp*`).join`\n`}
  
  • *Limit Leaderboard Top ${len}* •
  Kamu: *${usersLim.indexOf(m.name) + 1}* dari *${usersLim.length}*
  
  ${sortedLim.slice(0, len).map(({ jid, limit }, i) => `${i + 1}. ${participants.some(p => jid === p.jid) ? `(${conn.getName(jid)}) wa.me/` : '@'}${jid.split`@`[0]} *${limit} Limit*`).join`\n`}
  
  • *level Leaderboard Top ${len}* •
  Kamu: *${usersLevel.indexOf(m.name) + 1}* dari *${usersLevel.length}*
  
  ${sortedLevel.slice(0, len).map(({ jid, level }, i) => `${i + 1}. ${participants.some(p => jid === p.jid) ? `(${conn.getName(jid)}) wa.me/` : '@'}${jid.split`@`[0]} *level ${level}*`).join`\n`}
  
  • *Money Leaderboard Top ${len}* •
  Kamu: *${usersMoney.indexOf(m.name) + 1}* dari *${usersMoney.length}*
  
  ${sortedMoney.slice(0, len).map(({ jid, money }, i) => `${i + 1}. ${participants.some(p => jid === p.jid) ? `(${conn.getName(jid)}) wa.me/` : '@'}${jid.split`@`[0]} *Money ${money}*`).join`\n`}
  
  • *bank Leaderboard Top ${len}* •
  Kamu: *${usersbank.indexOf(m.name) + 1}* dari *${usersbank.length}*
  
  ${sortedbank.slice(0, len).map(({ jid, bank }, i) => `${i + 1}. ${participants.some(p => jid === p.jid) ? `(${conn.getName(jid)}) wa.me/` : '@'}${jid.split`@`[0]} *Bank ${bank}*`).join`\n`}
  `.trim()
    conn.reply(m.chat, text, m, {
      contextInfo: {
        mentionedJid: [...usersExp.slice(0, len), ...usersLim.slice(0, len), ...usersLevel.slice(0, len), ...usersMoney.slice(0, len), ...usersBank.slice(0, len)].filter(v => !participants.some(p => v === p.jid))
      }
    })
  }
  handler.help = ['leaderboard <amount user>']
  handler.tags = ['info']
  handler.command = /^(leaderboard|lb)$/i
  handler.owner = false
  handler.mods = false
  handler.premium = false
  handler.group = true
  handler.private = false
  
  handler.admin = false
  handler.botAdmin = false
  handler.rpg = true
  
  handler.fail = null
  handler.exp = 0
  
  }

module.exports = handler
  
  function sort(property, ascending = true) {
    if (property) return (...args) => args[ascending & 1][property] - args[!ascending & 1][property]
    else return (...args) => args[ascending & 1] - args[!ascending & 1]
  }
  
  function toNumber(property, _default = 0) {
    if (property) return (a, i, b) => {
      return {...b[i], [property]: a[property] === undefined ? _default : a[property]}
    }
    else return a => a === undefined ? _default : a
  }
  
  function enumGetKey(a) {
    return a.jid
  }