const admin = require('firebase-admin')
const bodyParser = require('body-parser')
const consola = require('consola')
const cookieParser = require('cookie-parser')
const express = require('express')
const { Nuxt, Builder } = require('nuxt')

const app = express()

const config = require('../nuxt.config.js')
const logout = require('./routes/logout')
const sessionLogin = require('./routes/session-login')
const authStatus = require('./routes/auth-status')

// Import and Set Nuxt.js options
config.dev = process.env.NODE_ENV !== 'production'

// Initialize Admin SDK.
admin.initializeApp({
  credential: admin.credential.cert('./server/serviceAccountKeys.json')
})

app.use(cookieParser())
app.use(bodyParser.json())

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  app.get('/logout', logout)
  app.get('/authStatus', authStatus)
  app.post('/sessionLogin', sessionLogin)

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()
