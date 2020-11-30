import Vue from "vue";
import Vuex from "vuex";
import articleStore from "./article";
import userStore from "./user";
Vue.use(Vuex);
// headers: {
//   'Authorization': `Basic ${token}`
// }
export const store = new Vuex.Store({
  state: {
    serverErr: null,
  },
  getters: {
    getServerErr: function (state) {
      return state.serverErr;
    },
  },
  mutations: {
    serverFail: function (state, payload) {
      state.serverErr = payload;
    },
  },
  modules: {
    user: userStore,
    article: articleStore,
  },
});
