import Axios from "axios";
import { getToken, storeToken } from "../../jwt/jwt";
import { URL } from "../../db";

const userStore = {
  state: {
    user: {},
    errors: {
      loginErr: null,
      serverErr: null,
      signupErr: null,
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
    signupErr: (state) => {
      return state.errors.signupErr;
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

    signupReq: function (state) {
      state.errors.signupErr = null;
    },
    signupSuc: function (state, payload) {
      state.user = payload;
    },
    signupFail: function (state, payload) {
      state.errors.signupErr = payload;
    },
    logoutReq: function (state) {
      state.errors.logoutErr = null;
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
    signup: async function (context, payload) {
      try {
        await Axios.post(URL + "/users", { user: payload });
        const loginUser = {
          email: this.email,
          password: this.password,
        };
        await context.dispatch("login", loginUser);
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.errors
        ) {
          context.commit("signupFail", error.response.data.errors);
        }
        context.commit("serverFail", error);
      }
    },
    follow: async function ({ getters, commit }, payload) {
      const token = getToken();
      const username = payload;
      const response = await Axios.post(
        URL + `/profiles/${username}/follow`,
        {},
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      const newArticle = getters.articleDetail;

      newArticle.author = response.data.profile;

      commit("setArticleDetail", newArticle);
      ///api/profiles/:username/follow
    },
    unfollow: async function ({ getters, commit }, payload) {
      const token = getToken();
      const username = payload;
      const response = await Axios.delete(
        URL + `/profiles/${username}/follow`,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      const newArticle = getters.articleDetail;

      newArticle.author = response.data.profile;

      commit("setArticleDetail", newArticle);
      ///api/profiles/:username/follow
    },
    favoritePost: async function (context, payload) {
      try {
        const token = getToken();

        const slug = payload;
        const response = await Axios.post(
          URL + `/articles/${slug}/favorite`,
          {},
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
        const newArticle = response.data.article;

        context.commit("setArticleDetail", newArticle);
      } catch (error) {
        console.log(error);
      }
    },
    unfavoritePost: async function (context, payload) {
      try {
        const token = getToken();
        const slug = payload;
        const response = await Axios.delete(
          URL + `/articles/${slug}/favorite`,
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
        const newArticle = response.data.article;

        context.commit("setArticleDetail", newArticle);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
export default userStore;
