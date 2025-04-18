const { getMessage } = require('../lib/languages');

const fetch = require('node-fetch');
const uploader = require('../lib/uploadFile');

let handler = async (m, { conn, usedPrefix, command }) => {
    // Get user's preferred language
    const user = global.db.data.users[m.sender];
    const chat = global.db.data.chats[m.chat];
    const lang = user?.language || chat?.language || global.language;
 {
	let q = m.quoted ? m.quoted : m
	let mime = (q.msg || q).mimetype || q.mediaType || ''
	if (/video|audio/.test(mime)) {
		let buffer = await q.download()
		await m.reply(wait)
		try {
		let media = await uploader(buffer)
		let json = await (await fetch(`https://api.betabotz.eu.org/fire/tools/whatmusic?url=${media}&apikey=${lann}`)).json()		
        conn.sendMessage(m.chat, { text: json.result }, { quoted: m })
        } catch (err) {
      throw `${eror}`
    }
 } else throw `Reply audio/video with command ${usedPrefix + command}`
}
handler.help = ['whatmusic']
handler.tags = ['tools']
handler.command = /^(whatmusic)$/i
handler.limit = true;

}

module.exports = handler
