import Axios from "axios";
import { URL } from "../../db";
import { getToken } from "../../jwt/jwt";

export default {
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
  addArticle: async function ({ commit }, payload) {
    const token = getToken();
    const article = payload;
    try {
      const response = await Axios.post(
        URL + "/articles",
        {
          article,
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      return response.data.article.slug;
    } catch (error) {
      commit("serverFail", error);
    }
  },
  deleteArticle: async function ({ commit }, payload) {
    try {
      const token = getToken();
      //     DELETE /api/articles/:slug
      // Authentication required
      return Axios.delete(URL + `/articles/${payload}`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
    } catch (error) {
      commit("serverFail", error);
    }
  },
};
