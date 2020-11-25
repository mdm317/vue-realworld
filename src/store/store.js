import Axios from "axios";
import Vue from "vue";
import Vuex from "vuex";
import { URL } from "../db";
import { storeToken } from "../jwt/jwt";
Vue.use(Vuex);
// headers: {
//   'Authorization': `Basic ${token}`
// }
// const delay = () => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve();
//     }, 2000);
//   });
// };
export const store = new Vuex.Store({
  state: {
    user: {},
    errors: {
      loginErr: null,
      serverErr: "",
    },
  },
  getters: {
    username: function (state) {
      return state.user?.username;
    },
    user: function (state) {
      return state.user;
    },
    loginErr: function (state) {
      return state.errors.loginErr;
    },
    getServerErr: function (state) {
      return state.errors.serverErr;
    },
  },
  mutations: {
    //commit  //computed

    loginReq: function (state) {
      state.errors.loginErr = null;
    },
    loginSuc: function (state, payload) {
      state.user = payload;
    },
    loginFail: function (state, payload) {
      state.errors.loginErr = payload;
    },
    logoutReq: function (state) {
      state.errors.logoutErr = null;
    },
  },
  actions: {
    //dispatch  //method
    login: async function (context, payload) {
      try {
        context.commit("loginReq");
        const response = await Axios.post(URL + "/users/login", {
          user: payload,
        });
        context.commit("loginSuc", response.data.user);
        storeToken(response.data.user.token);
      } catch (error) {
        console.log("[error]:", error);
        if (
          error.response &&
          error.response.data &&
          error.response.data.errors
        ) {
          return context.commit("loginFail", error.response.data.errors);
        }
        return context.commit("serverFail", "An internal error occurred");
      }
    },
    getUser: async function (context, payload) {
      try {
        const response = await Axios.get(URL + "/user", {
          headers: {
            Authorization: `Token ${payload}`,
          },
        });
        return context.commit("loginSuc", response.data.user);
      } catch (error) {
        console.log("[error]:", error);
      }
    },
  },
});
