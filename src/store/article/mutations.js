export default {
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
  addArticleReq: function (state) {
    state.addArticleErr = null;
  },
  addArticleFail: function (state, payload) {
    state.addArticleErr = payload;
  },
  getTagSuc: function (state, payload) {
    state.tags = payload;
  },
  deleteComment(state, payload) {
    state.comments = state.comments.filter(
      (comment) => comment.id !== Number(payload)
    );
    console.log(state.comments);
  },
};
