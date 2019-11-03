import Vue from 'vue'

import firebase from 'firebase/app'
import 'firebase/auth'

import * as firebaseui from 'firebaseui'

import firebaseConfig from '../firebase.config'

if (!Vue.prototype.$fb) {
  firebase.initializeApp(firebaseConfig)
  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE)
  Vue.prototype.$fb = firebase
  Vue.prototype.$fbui = firebaseui
}
