import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

import * as alert from './modules/alert';
import * as auth from './modules/auth';
import * as emails from './modules/emails';
import * as emails_params from './modules/emailsParams';


Vue.use(Vuex)

const AuthState =  createPersistedState({
  paths: ['auth']
})

export default new Vuex.Store({
  modules: {
    alert,
    auth,
    emails,
    emails_params,
  },
  plugins: [AuthState],
})
