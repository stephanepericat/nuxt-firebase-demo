export default async function({ $axios, redirect }) {
  try {
    const check = await $axios.get('/authStatus')
    if (!check.data || !check.data.authenticated) {
      redirect('/login')
    }
  } catch (e) {
    redirect('/login')
  }
}
