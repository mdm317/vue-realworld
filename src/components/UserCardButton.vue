<template>
  <span>
    <button
      @click="clickFollowBtn"
      class="btn btn-sm btn-outline-secondary"
      :class="{ active: article.author.following }"
    >
      <i class="ion-plus-round"></i>
      <span> &nbsp;</span>
      <span v-if="article.author.following">
        {{ " ➖ UnFollow " + article.author.username }}</span
      >
      <span v-else> {{ " ➕ Follow " + article.author.username }}</span>
    </button>
    <button
      @click="clickFavoriteArticleBtn"
      class="btn btn-sm btn-outline-primary"
      :class="{ active: article.favorited }"
    >
      <i v-if="!article.favorited" class="ion-heart"> </i>
      <span> &nbsp;</span>
      <span v-if="!article.favorited">💖 Favorite </span>
      <span v-else>💔 UnFavorite Post</span>
      <span class="counter">({{ article.favoritesCount }})</span>
    </button>
  </span>
</template>

<script>
import { mapActions } from "vuex";

export default {
  methods: {
    ...mapActions(["unfollow", "follow", "favoritePost", "unfavoritePost"]),

    clickFollowBtn: function () {
      if (this.article.author.following) {
        this.unfollow(this.article.author.username);
      } else {
        this.follow(this.article.author.username);
      }
    },
    clickFavoriteArticleBtn: function () {
      if (!this.article.favorited) {
        this.favoritePost(this.article.slug);
      } else {
        this.unfavoritePost(this.article.slug);
      }
    },
  },
  computed: {
    article() {
      return this.$store.getters.articleDetail;
    },
  },
};
</script>

<style></style>
