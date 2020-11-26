import Axios from "axios";
import { URL } from "../../db";
import { getToken } from "../../jwt/jwt";
const articleStore = {
  state: {
    articleList: null,
    articleListLoading: false,
    articleDetail: null,
    comments: [],
    articleListErr: null,
    articleDetailErr: null,
    commentsErr: null,
    serverErr: null,
  },
  getters: {
    articleList: function (state) {
      return state.articleList;
    },
    articleDetail: function (state) {
      return state.articleDetail;
    },
    comments: function (state) {
      return state.comments;
    },
  },
  mutations: {
    getArticleListReq: function (state) {
      state.articleList = null;
      state.articleListErr = null;
      state.articleListLoading = true;
    },
    getArticleListSuc: function (state, payload) {
      state.articleList = payload;
      state.articleListLoading = false;
    },
    getArticleListFail: function (state, payload) {
      state.articleListErr = payload;
      state.articleListLoading = false;
    },
    getArticleDetailReq: function (state) {
      state.articleDetail = null;
      state.articleDetailErr = null;
    },
    getArticleDetailSuc: function (state, payload) {
      state.articleDetail = payload;
    },
    getArticleDetailFail: function (state, payload) {
      state.articleDetailErr = payload;
    },
    getcommentsReq: function (state) {
      state.comments = null;
      state.commentsErr = null;
    },
    getcommentsSuc: function (state, payload) {
      state.comments = payload;
    },
    getcommentsFail: function (state, payload) {
      state.commentsErr = payload;
    },
    serverFail: function (state, payload) {
      state.serverErr = payload;
    },
    setArticleDetail: function (state, payload) {
      state.articleDetail = payload;
    },
    addComment: function (state, payload) {
      state.comments = [payload, ...state.comments];
    },
  },
  actions: {
    getArticleList: async function (context, payload) {
      try {
        const tagQuery = payload.tag ? `tag=${payload.tag}&` : "";
        const offsetQuery = payload.offset ? `offset=${payload.offset}&` : "";
        const limitQuery = payload.limit ? `limit=${payload.limit}&` : "";
        const response = await Axios.get(
          URL + "/articles?" + tagQuery + offsetQuery + limitQuery
        );
        const articleList = response.data.articles;
        context.commit("getArticleListSuc", articleList);
      } catch (error) {
        context.commit("serverFail", error);
      }
    },
    getArticleDetail: async function (context, payload) {
      try {
        context.commit("getArticleDetailReq");

        const slug = payload;
        const articleResponse = await Axios.get(URL + `/articles/${slug}`);
        context.commit("getArticleDetailSuc", articleResponse.data.article);
        const commentResponse = await Axios.get(
          URL + `/articles/${slug}/comments`
        );
        context.commit("getcommentsReq");

        context.commit("getcommentsSuc", commentResponse.data.comments);
      } catch (error) {
        context.commit("getArticleDetailFail", error);
        context.commit("getcommentsFail", error);
        throw Error(error);
      }
    },
    // // POST /api/articles/:slug/comments
    // {
    //   "comment": {
    //     "body": "His name was my name too."
    //   }
    // }
    addComment: async function ({ commit }, payload) {
      try {
        const token = getToken();
        const { slug } = payload;
        const comment = { body: payload.content };
        const response = await Axios.post(
          URL + `/articles/${slug}/comments`,
          { comment },
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
        commit("addComment", response.data.comment);
      } catch (error) {
        commit("serverFail", error);
      }
    },
  },
};
export default articleStore;
