const { getMessage } = require('../lib/languages');

const { readdirSync, statSync, unlinkSync } = require('fs');
const { join } = require('path');

let handler = async (m, { conn, usedPrefix, args }) => {
    // Get user's preferred language
    const user = global.db.data.users[m.sender];
    const chat = global.db.data.chats[m.chat];
    const lang = user?.language || chat?.language || global.language;
 {

  const sesi = ['./sessions'];
  const array = [];

  sesi.forEach(dirname => {
    readdirSync(dirname).forEach(file => {
      if (file !== 'creds.json') { 
        array.push(join(dirname, file));
      }
    });
  });

  const deletedFiles = [];

  array.forEach(file => {
    const stats = statSync(file);

    if (stats.isDirectory()) {
      console.log(`Skipping directory: ${file}`);
    } else {
      unlinkSync(file);
      deletedFiles.push(file);
    }
  });

  if (deletedFiles.length > 0) {
    console.log('Deleted files:', deletedFiles);
    conn.reply(m.chat, getMessage('clearsessions_success', lang), m);
  } else {
    conn.reply(m.chat, getMessage('clearsessions_no_files', lang), m);
  }
};

handler.help = ['clearsession'];
handler.tags = ['owner'];
handler.command = /^(clearsession|clearsessions)$/i;
handler.rowner = true;

}

module.exports = handler;
