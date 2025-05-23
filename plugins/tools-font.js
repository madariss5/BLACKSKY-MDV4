const { getMessage } = require('../lib/languages');

let fetch = require('node-fetch');
let handler = async (m, { text, usedPrefix, command }) => {
    if (!text) throw `Example:\n${usedPrefix + command} betabotz`
    
    try {
        let json = await fetch(`https://api.betabotz.eu.org/fire/tools/styletext?text=${text}&apikey=${lann}`)
        let data = await json.json()
        let caption = ""
        for (let x of data.result) {
            caption += `
${x.result}\n`
        }
        return m.reply(caption)
    } catch (e) {
        console.log(e)
        throw `${eror}`
    }
}

handler.help = ['font','styletext'].map(v => v + ' <text>')
handler.tags = ['tools']
handler.command = /^(font|styletext)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null
handler.limit = true

module.exports = handler
