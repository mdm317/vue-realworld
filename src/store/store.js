import Vue from "vue";
import Vuex from "vuex";
import articleStore from "./article";
import userStore from "./user";
Vue.use(Vuex);
// headers: {
//   'Authorization': `Basic ${token}`
// }
export const store = new Vuex.Store({
  modules: {
    user: userStore,
    article: articleStore,
  },
});
