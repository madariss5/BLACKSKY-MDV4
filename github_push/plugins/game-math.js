const { getMessage } = require('../lib/languages');

let handler = async (m, { conn, args, usedPrefix }) => {
    // Get user's preferred language
    const user = global.db.data.users[m.sender];
    const chat = global.db.data.chats[m.chat];
    const lang = user?.language || chat?.language || global.language;
 {
  conn.math = conn.math ? conn.math : {}
  if (args.length < 1) {
    const mathModes = getMessage('math_modes', lang, {
      modes: Object.keys(modes).join(' | '),
      prefix: usedPrefix
    });
    throw mathModes.trim();
  }
  
  let mode = args[0].toLowerCase()
  if (!(mode in modes)) {
    const mathModes = getMessage('math_modes', lang, {
      modes: Object.keys(modes).join(' | '),
      prefix: usedPrefix
    });
    throw mathModes.trim();
  }
  
  let id = m.chat
  if (id in conn.math) {
    return conn.reply(m.chat, getMessage('math_ongoing', lang), conn.math[id][0])
  }
  
  let math = genMath(mode)
  conn.math[id] = [
    await conn.reply(m.chat, getMessage('math_question', lang, {
      problem: math.str,
      time: (math.time / 1000).toFixed(2),
      bonus: math.bonus
    }), m),
    math, 4,
    setTimeout(() => {
      if (conn.math[id]) conn.reply(m.chat, getMessage('math_timeout', lang, {
        result: math.result
      }), conn.math[id][0])
      delete conn.math[id]
    }, math.time)
  ]
}
handler.help = ['math <mode>']
handler.tags = ['game']
handler.command = /^math/i

}

module.exports = handler

let modes = {
  noob: [-3, 3,-3, 3, '+-', 15000, 10],
  easy: [-10, 10, -10, 10, '*/+-', 20000, 40],
  medium: [-40, 40, -20, 20, '*/+-', 40000, 150],
  hard: [-100, 100, -70, 70, '*/+-', 60000, 350],
  extreme: [-999999, 999999, -999999, 999999, '*/', 99999, 9999],
  impossible: [-99999999999, 99999999999, -99999999999, 999999999999, '*/', 30000, 35000],
  impossible2: [-999999999999999, 999999999999999, -999, 999, '/', 30000, 50000]
} 

let operators = {
  '+': '+',
  '-': '-',
  '*': '×',
  '/': '÷'
}

function genMath(mode) {
  let [a1, a2, b1, b2, ops, time, bonus] = modes[mode]
  let a = randomInt(a1, a2)
  let b = randomInt(b1, b2)
  let op = pickRandom([...ops])
  let result = (new Function(`return ${a} ${op.replace('/', '*')} ${b < 0 ? `(${b})` : b}`))()
  if (op == '/') [a, result] = [result, a]
  return {
    str: `${a} ${operators[op]} ${b}`,
    mode,
    time,
    bonus,
    result
  }
}

function randomInt(from, to) {
  if (from > to) [from, to] = [to, from]
  from = Math.floor(from)
  to = Math.floor(to)
  return Math.floor((to - from) * Math.random() + from)
}

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}
