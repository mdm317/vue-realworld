<template>
  <div class="article-meta">
    <router-link
      :to="{ name: 'profile', params: { username: article.author.username } }"
      ><img :src="article.author.image"
    /></router-link>
    <div class="info">
      <router-link
        :to="{ name: 'profile', params: { username: article.author.username } }"
        >{{ article.author.username }}</router-link
      >
      <span class="date">{{ mapDate }}</span>
    </div>
    <button
      @click="clickFavoriteArticleBtn"
      v-if="isHome"
      class="btn btn-outline-primary btn-sm pull-xs-right"
      :class="{ active: article.favorited }"
    >
      <i class="ion-heart"></i> <span>💚 </span>{{ article.favoritesCount }}
    </button>
    <UserCardAuthorButton
      v-else-if="article.author.username === username"
    ></UserCardAuthorButton>
    <UserCardButton
      v-else
      @click-favorite="clickFavoriteArticleBtn"
    ></UserCardButton>
  </div>
</template>

<script>
import UserCardAuthorButton from "./UserCardAuthorButton.vue";
import UserCardButton from "./UserCardButton.vue";
import { getMonth } from "../utils.js";
import { mapActions } from "vuex";

export default {
  components: { UserCardButton, UserCardAuthorButton },
  data: function () {
    return {};
  },
  props: {
    article: Object,
    isHome: Boolean,
  },
  methods: {
    ...mapActions(["favoritePost", "unfavoritePost"]),

    clickFavoriteArticleBtn: function () {
      if (!this.article.favorited) {
        this.favoritePost(this.article.slug);
      } else {
        this.unfavoritePost(this.article.slug);
      }
    },
  },
  computed: {
    username() {
      return this.$store.getters.username;
    },
    mapDate() {
      const dateStr = this.article.createdAt;
      const year = dateStr.slice(0, 4);
      const month = dateStr.slice(5, 7);
      const date = dateStr.slice(8, 10);
      return getMonth(month) + " " + date + "," + year;
    },
  },
};
</script>

<style></style>
