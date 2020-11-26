<template>
  <div class="article-meta">
    <a href=""><img :src="article.author.image" /></a>
    <div class="info">
      <a href="" class="author">{{ article.author.username }}</a>
      <span class="date">{{ calDate(article.createdAt) }}</span>
    </div>
    <button
      @click="clickFollowBtn"
      class="btn btn-sm btn-outline-secondary"
      :class="{ active: article.author.following }"
    >
      <i class="ion-plus-round" v-if="article.author.following"
        >&nbsp;{{ " - UnFollow " + article.author.username }}</i
      >
      <i class="ion-plus-round" v-else
        >&nbsp;{{ " + Follow " + article.author.username }}</i
      >
    </button>
    &nbsp;&nbsp;
    <button
      @click="clickFavoriteArticleBtn"
      class="btn btn-sm btn-outline-primary"
      :class="{ active: article.favorited }"
    >
      <i v-if="!article.favorited" class="ion-heart"> &nbsp; Favorite Post</i>
      <i v-else class="ion-heart"> &nbsp; UnFavorite Post</i>

      <span class="counter">({{ article.favoritesCount }})</span>
    </button>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  methods: {
    ...mapActions(["unfollow", "follow", "favoritePost", "unfavoritePost"]),
    calDate: function (dateStr) {
      // "2016-02-18T03:22:56.637Z",
      const month = dateStr.slice(5, 7);
      const date = dateStr.slice(8, 10);
      return month + " / " + date;
    },
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
