const { getMessage } = require('../lib/languages');
const fetch = require('node-fetch');
const uploadImage = require('../lib/uploadImage.js');

async function handler(m, { conn, usedPrefix, command }) {
  try {
    const q = m.quoted ? m.quoted : m;
    const mime = (q.msg || q).mimetype || q.mediaType || '';
    if (/^image/.test(mime) && !/webp/.test(mime)) {
      const img = await q.download();
      const out = await uploadImage(img);
      const fire = await fetch(`https://api.betabotz.eu.org/fire/tools/img2prompt?url=${out}&apikey=${lann}`);
      const res = await fire.json();
      await conn.sendMessage(m.chat, {
    text: res.result,
    contextInfo: {
        externalAdReply: {
            title: 'Img2Prompt',
            body: '',
            thumbnailUrl: 'https://telegra.ph/file/dbb8cc0a157e3aa856877.jpg',
            sourceUrl: "https://api.betabotz.eu.org",
            mediaType: 1,
            renderLargerThumbnail: true
        }
    }
}, {
    quoted: m
})
    } else {
      m.reply(`Kirim image dengan caption *${usedPrefix + command}* atau tag image which already dikirim.`);
    }
  } catch (e) {
    console.error(e);
    m.reply(`Identifikasi Failed. Silwill coba again.`);
  }
}

handler.help = ['img2prompt'];
handler.tags = ['tools'];
handler.command = ['img2prompt'];
handler.premium = false;
handler.limit = false;
handler.group = true;

module.exports = handler;

