import actions from "./actions";
import mutations from "./mutations";
const userStore = {
  state: {
    user: {},
    errors: {
      loginErr: null,
      signupErr: null,
    },
    userProfile: {},
    getProfileLoading: false,
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
    userProfile: (state) => {
      return state.userProfile;
    },
    getProfileLoading: (state) => {
      return state.getProfileLoading;
    },
  },
  mutations,
  actions,
};
export default userStore;
