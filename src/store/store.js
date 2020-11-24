import Axios from "axios";
import Vue from "vue";
import Vuex from "vuex";
import { URL } from "../db";
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
      loginErr: {},
      serverErr: "",
    },
  },
  getters: {
    username: function (state) {
      return state.user?.username;
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
      state.errors.loginErr = {};
    },
    loginSuc: function (state, payload) {
      state.user = payload.user;
    },
    loginFail: function (state, payload) {
      state.errors.loginErr = payload;
    },
    serverFail: function (state, payload) {
      state.errors.serverErr = payload;
    },
  },
  actions: {
    //dispatch  //method
    login: async function (context, payload) {
      try {
        context.commit("loginReq");
        const response = await Axios.post("local" + "/users/login", {
          user: payload,
        });
        context.commit("loginSuc", response.data);
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
    getUser: async function (context) {
      try {
        const response = await Axios.get(URL + "/user", {
          withCredentials: true,
        });
        return context.commit("setUser", response.data.user);
      } catch (error) {
        console.log("[error]:", error);
      }
    },
  },
});
