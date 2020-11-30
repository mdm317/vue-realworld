<template>
  <div v-if="article" class="article-page">
    <div class="banner">
      <div class="container">
        <h1>{{ article.title }}</h1>
        <UserCard />
      </div>
    </div>

    <div class="container page">
      <div class="row article-content">
        <div class="col-md-12">
          <p>
            {{ article.description }}
          </p>
          <h2 id="introducing-ionic">{{ article.title }}</h2>
          <p>{{ article.body }}</p>
        </div>
      </div>
      <div class="tag-list">
        <span
          v-for="tag of article.tagList"
          class="tag-default tag-pill"
          :key="tag"
        >
          {{ tag }}
        </span>
      </div>
      <hr />
      <div class="article-actions">
        <UserCard />
      </div>

      <CommentBox v-if="comments" :comments="comments" :slug="slug" />
    </div>
  </div>
</template>

<script>
import CommentBox from "../components/CommentBox.vue";
import UserCard from "../components/UserCard.vue";
import { mapGetters } from "vuex";

export default {
  components: { CommentBox, UserCard },
  props: {
    slug: String,
  },
  mounted() {
    this.$store.dispatch("getArticleDetail", this.slug);
  },
  computed: {
    ...mapGetters({
      username: "username",
      article: "articleDetail",
      comments: "comments",
    }),
  },
};
</script>

<style></style>
