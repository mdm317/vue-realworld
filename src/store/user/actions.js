import Axios from "axios";
import { getToken, storeToken } from "../../jwt/jwt";
import { URL } from "../../db";

export default {
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
      if (error.response && error.response.data && error.response.data.errors) {
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
      if (error.response && error.response.data && error.response.data.errors) {
        context.commit("signupFail", error.response.data.errors);
      }
      context.commit("serverFail", error);
    }
  },
  follow: async function (_, payload) {
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
    return response.data.profile;

    ///api/profiles/:username/follow
  },
  followAtArticleDetail: async function (context, payload) {
    const { action, username } = payload;
    const newUser = await context.dispatch(action, username);
    const newArticle = context.getters.articleDetail;
    newArticle.author = newUser;
    context.commit("setArticleDetail", newArticle);
  },
  followAtUserProfile: async function (context, payload) {
    const { action, username } = payload;
    const newUser = await context.dispatch(action, username);
    context.commit("getUserProfileSuc", newUser);
  },
  unfollow: async function (_, payload) {
    const token = getToken();
    const username = payload;
    const response = await Axios.delete(URL + `/profiles/${username}/follow`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    return response.data.profile;
    ///api/profiles/:username/follow
  },
  getUserProfile: async function ({ commit }, payload) {
    try {
      // ET /api/profiles/:username
      commit("getUserProfileReq");
      const token = getToken();
      const header = {};
      if (token) {
        header.headers = { Authorization: `Token ${token}` };
      }

      const response = await Axios.get(URL + `/profiles/${payload}`, header);

      commit("getUserProfileSuc", response.data.profile);
    } catch (error) {
      commit("getUserProfileFail", error);
    }
  },
};
