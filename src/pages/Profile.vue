<template>
  <div class="profile-page">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="user.image" class="user-img" />
            <h4>{{ user.username }}</h4>
            <p>
              {{ user.bio }}
            </p>
            <button
              v-if="loginUserName !== user.username"
              @click="clickFollowBtn"
              class="btn btn-sm btn-outline-secondary action-btn"
              :class="{ active: user.following }"
            >
              <i class="ion-plus-round"></i>
              <span> &nbsp;</span>
              <span v-if="user.following">
                {{ " ➖ UnFollow " + user.username }}</span
              >
              <span v-else> {{ " ➕ Follow " + user.username }}</span>
            </button>
            <router-link
              :to="{ name: 'setting' }"
              v-else
              class="btn btn-sm btn-outline-secondary action-btn"
            >
              <i class="ion-plus-round"></i>
              &nbsp; Setting Page
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <a
                  class="nav-link"
                  :class="{ active: selectedNav === 'My Articles' }"
                  href=""
                  @click.prevent="clickNavItem"
                  >My Articles</a
                >
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  :class="{ active: selectedNav === 'Favorited Articles' }"
                  href=""
                  @click.prevent="clickNavItem"
                  >Favorited Articles</a
                >
              </li>
            </ul>
          </div>

          <ArticleList
            v-if="!getProfileLoading"
            :favorited="favorited"
            :feedState="feedState"
            :maxPage="maxPage"
            :pageArticleNum="pageArticleNum"
            :username="user.username"
          ></ArticleList>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import ArticleList from "../components/ArticleList.vue";

export default {
  data() {
    return {
      feedState: "USER",
      maxPage: 8,
      pageArticleNum: 5,
      selectedNav: "My Articles",
      favorited: false,
    };
  },
  components: { ArticleList },
  mounted() {
    const username = this.$route.params.username;
    this.$store.dispatch("getUserProfile", username);
  },
  computed: {
    ...mapGetters({
      user: "userProfile",
      loginUserName: "username",
    }),
    ...mapGetters(["getProfileLoading"]),
  },
  methods: {
    ...mapActions(["followAtUserProfile"]),

    clickFollowBtn: function () {
      const username = this.user.username;
      if (this.user.following) {
        this.followAtUserProfile({ username, action: "unfollow" });
      } else {
        this.followAtUserProfile({ username, action: "follow" });
      }
    },
    clickNavItem: function (e) {
      this.selectedNav = e.target.text;
      if (this.selectedNav === "Favorited Articles") {
        const payload = {
          limit: this.pageArticleNum,
          favorited: this.user.username,
        };
        this.$store.dispatch("getArticleList", payload);
        this.favorited = true;
      }
      if (this.selectedNav === "My Articles") {
        const payload = {
          limit: this.pageArticleNum,
          username: this.user.username,
        };
        this.$store.dispatch("getArticleList", payload);
        this.favorited = false;
      }
    },
  },
};
</script>

<style></style>
