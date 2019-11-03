<template>
  <div id="container">
    <div id="loading" :class="{ hidden: loaded }">Loading...</div>
    <div id="redirecting" :class="{ hidden: !redirecting }">Redirecting...</div>
    <div id="firebaseui-container"></div>
  </div>
</template>
<script>
import AuthMixin from './auth.mixin'

export default {
  layout: 'login',

  middleware: 'csrf',

  mixins: [AuthMixin],

  computed: {
    loaded() {
      return this.isUiShown || false
    },

    redirecting() {
      return this.isRedirecting || false
    }
  },

  mounted() {
    if (!this.ui) {
      this.ui = new this.$fbui.auth.AuthUI(this.$fb.auth())
      this.ui.start('#firebaseui-container', this.uiConfig)
    }
  }
}
</script>
<style scoped>
@import 'https://www.gstatic.com/firebasejs/ui/4.2.0/firebase-ui-auth.css';

.hidden {
  display: none;
}
</style>
