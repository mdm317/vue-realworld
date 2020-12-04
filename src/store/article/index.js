import mutations from "./mutations";
import actions from "./actions";
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
    addArticleErr: null,
    tags: [],
  },
  getters: {
    articleListLoading: function (state) {
      return state.articleListLoading;
    },
    articleList: function (state) {
      return state.articleList;
    },
    articleDetail: function (state) {
      return state.articleDetail;
    },
    comments: function (state) {
      return state.comments;
    },
    addArticleErr: function (state) {
      return state.addArticleErr;
    },
    tags: function (state) {
      return state.tags;
    },
  },
  mutations,
  actions,
};
export default articleStore;
