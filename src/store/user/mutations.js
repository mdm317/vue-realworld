export default {
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
  getUserProfileReq: function (state) {
    state.userProfile = {};
    state.getProfileLoading = true;
  },
  getUserProfileSuc: function (state, payload) {
    state.userProfile = payload;
    state.getProfileLoading = false;
  },
  getUserProfileFail: function (state, payload) {
    state.serverErr = payload;
    state.getProfileLoading = false;
  },
};
