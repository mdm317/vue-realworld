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
    <span>{{ "  " }}</span>
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
    ...mapActions(["followAtArticleDetail"]),

    clickFollowBtn: function () {
      const username = this.article.author.username;
      if (this.article.author.following) {
        this.followAtArticleDetail({ username, action: "unfollow" });
      } else {
        this.followAtArticleDetail({ username, action: "follow" });
      }
    },
    clickFavoriteArticleBtn: function () {
      this.$emit("click-favorite");
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
