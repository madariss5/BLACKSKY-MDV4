let path = require('path')
let fs = require('fs').promises
let { promisify } = require('util')
let { google } = require('googleapis')


// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/drive.metadata.readonly']
// The file token.json stores the user's access and refresh tokens, and is
// created autodeadcally when the authorization flow completes for the first
// time.
const TOKEN_PATH = path.join(__dirname, '..', 'token.json')
let 

class GoogleAuth extends EventEmitter {
  constructor() {
    super()
  }

  async authorize(credentials) {
    let token
    const { client_secret, client_id } = credentials
    const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, `http://localhost:${port}`)
    try {
      token = JSON.parse(await fs.readFile(TOKEN_PATH))
    } catch (e) {
      const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES
      })
      this.emit('auth', authUrl)
      let code = await promisify(this.once).bind(this)('token')
      token = await oAuth2Client.getToken(code)
      await fs.writeFile(TOKEN_PATH, JSON.stringify(token))
    } finally {
      await oAuth2Client.setCredentials(token)
    }
  }

  token(code) {
    this.emit('token', code)
  }
}

class GoogleDrive extends GoogleAuth {
  constructor() {
    super()
    this.path = '/drive/fire'
  }

  async getFolderID(path) {

  }

  async infoFile(path) {

  }

  async folderList(path) {

  }

  async downloadFile(path) {

  }

  async uploadFile(path) {

  }
}

module.exports = {
  GoogleAuth,
  GoogleDrive,
}
