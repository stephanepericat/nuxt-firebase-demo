const admin = require('firebase-admin')

module.exports = async (req, res) => {
  const { session: sessionCookie } = req.cookies
  if (!sessionCookie) return res.json({ authenticated: false })

  const user = await admin.auth().verifySessionCookie(sessionCookie)
  const authenticated = !!(user && user.uid)
  res.json({ authenticated })
}
