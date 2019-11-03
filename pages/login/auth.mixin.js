import axios from 'axios'

export default {
  data() {
    return {
      isRedirecting: false,
      isUiShown: false,
      uiConfig: {
        callbacks: {
          signInSuccessWithAuthResult: (result) => {
            const { user = {} } = result
            this.handleSignedInUser(user)
            return false
          },
          uiShown: () => {
            this.isUiShown = true
          }
        },
        signInFlow: 'popup',
        signInOptions: [],
        tosUrl: 'https://www.google.com'
      }
    }
  },

  mounted() {
    this.uiConfig.signInOptions.push({
      provider: this.$fb.auth.GoogleAuthProvider.PROVIDER_ID
    })
    this.uiConfig.credentialHelper = this.$fbui.auth.CredentialHelper.NONE
  },

  methods: {
    getCookie(name) {
      const v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)')
      return v ? v[2] : null
    },

    async handleSignedInUser(user) {
      // Show redirection notice.
      this.isRedirecting = true
      // Set session cookie
      const idToken = await user.getIdToken()
      const csrfToken = this.getCookie('csrfToken')

      try {
        await this.postIdTokenToSessionLogin(
          '/sessionLogin',
          idToken,
          csrfToken
        )
        window.location.assign('/')
      } catch (e) {
        window.location.assign('/login')
      }
    },

    postIdTokenToSessionLogin(url, idToken, csrfToken) {
      return axios({
        url,
        data: JSON.stringify({ csrfToken, idToken }),
        headers: { 'Content-Type': 'application/json' },
        method: 'POST'
      })
    }
  }
}
