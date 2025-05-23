const { getMessage } = require('../lib/languages');

const fetch = require('node-fetch');

let handler = async (m, { conn, text, usedPrefix, command }) => {
    // Get user's preferred language
    const user = global.db.data.users[m.sender];
    const chat = global.db.data.chats[m.chat];
    const lang = user?.language || chat?.language || global.language;
 {
	if (!text) throw `*Usage : ${usedPrefix + command} url*\n\nExample: ${usedPrefix + command} https://soundcloud.com/issabella-marchelina/sisa-rasa-expensiveini-official-audio?utm_source=clipboard&utm_medium=text&utm_campaign=social_sdaysng`
	if (!(text.includes('http://') || text.includes('https://'))) throw `url invalid, please input a valid url. Try with add http:// or https://`
	try {
		let res = await fetch(`https://api.betabotz.eu.org/fire/download/soundcloud?url=${text}&apikey=${lann}`)
		let anu = await res.json()
		anu = anu.result
		let ini_txt = `*${anu.title}*\n\n`
		
		await conn.sendFile(m.chat, anu.thumbnail, 'scloud.jpg', ini_txt, m)
		conn.sendMessage(m.chat, {
                audio: {
                    url: anu.url
                },
                mimetype: 'audio/mpeg',
                contextInfo: {
                    externalAdReply: {
                        title: anu.title,
                        body: "",
                        thumbnailUrl: anu.thumbnail,
                        sourceUrl: anu.url,
                        mediaType: 1,
                        showAdAttribution: true,
                        renderLargerThumbnail: true
                    }
                }
            }, {
                quoted: m
            });		
	} catch (e) {
		console.log(e)
		m.reply(`Invalid Soundcloud URL / terjadi kewrongan.`)
	}
}

handler.help = ['soundcloud <url>']
handler.tags = ['downloader']
handler.command = /^(s(ound)?cloud)$/i

}

module.exports = handler
