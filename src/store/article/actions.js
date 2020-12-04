import Axios from "axios";
import { URL } from "../../db";
import { getToken } from "../../jwt/jwt";

export default {
  getArticleList: async function ({ commit }, payload) {
    try {
      commit("getArticleListReq");

      const tagQuery = payload.tag ? `tag=${payload.tag}&` : "";
      const offsetQuery = payload.offset ? `offset=${payload.offset}&` : "";
      const limitQuery = payload.limit ? `limit=${payload.limit}&` : "";
      const author = payload.username ? `author=${payload.username}&` : "";
      const favorited = payload.favorited
        ? `favorited=${payload.favorited}&`
        : "";

      ("");
      const token = getToken();
      const header = {};
      if (token) {
        header.headers = { Authorization: `Token ${token}` };
      }
      const response = await Axios.get(
        URL +
          "/articles?" +
          tagQuery +
          offsetQuery +
          limitQuery +
          author +
          favorited,
        header
      );
      const articleList = response.data.articles;
      commit("getArticleListSuc", articleList);
    } catch (error) {
      commit("serverFail", error);
    }
  },
  getArticleDetail: async function (context, payload) {
    try {
      context.commit("getArticleDetailReq");
      const token = getToken();
      const slug = payload;

      let articleResponse;
      if (token) {
        articleResponse = await Axios.get(URL + `/articles/${slug}`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
      } else {
        articleResponse = await Axios.get(URL + `/articles/${slug}`);
      }

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
      commit("addArticleReq");
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
      if (error.response && error.response.data && error.response.data.errors) {
        commit("addArticleFail", error.response.data.errors);
      }
      commit("serverFail", error);
      throw Error(error);
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
  getTags: async function ({ commit }) {
    try {
      const response = await Axios.get(URL + "/tags");
      commit("getTagSuc", response.data.tags);
    } catch (error) {
      commit("serverFail", error);
    }
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
      if (
        context.getters.articleDetail &&
        context.getters.articleDetail.slug === newArticle.slug
      ) {
        context.commit("setArticleDetail", newArticle);
      } else {
        const newArticleList = context.getters.articleList.map((article) => {
          if (article.slug === newArticle.slug) {
            return newArticle;
          }
          return article;
        });
        context.commit("getArticleListSuc", newArticleList);
      }
    } catch (error) {
      console.log(error);
    }
  },
  unfavoritePost: async function (context, payload) {
    try {
      const token = getToken();
      const slug = payload;
      const response = await Axios.delete(URL + `/articles/${slug}/favorite`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      const newArticle = response.data.article;
      if (
        context.getters.articleDetail &&
        context.getters.articleDetail.slug === newArticle.slug
      ) {
        context.commit("setArticleDetail", newArticle);
      } else {
        const newArticleList = context.getters.articleList.map((article) => {
          if (article.slug === newArticle.slug) {
            return newArticle;
          }
          return article;
        });
        context.commit("getArticleListSuc", newArticleList);
      }
    } catch (error) {
      console.log(error);
    }
  },
  deleteComment: async function ({ commit }, payload) {
    // DELETE /api/articles/:slug/comments/:id
    const token = getToken();
    const { slug, id } = payload;
    await Axios.delete(URL + `/articles/${slug}/comments/${id}`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    commit("deleteComment", id);
  },
};
