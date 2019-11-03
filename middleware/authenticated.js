export default async function({ $axios, req, res }) {
  const url = `${req.protocol}://${req.headers.host}/authStatus`

  try {
    const check = await $axios.get(url)
    if (!check.data || !check.data.authenticated) {
      res.redirect('/login')
    }
  } catch (e) {
    res.redirect('/login')
  }
}
