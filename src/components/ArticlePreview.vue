<template>
  <div class="article-preview">
    <UserCard :isHome="true" :article="article"></UserCard>
    <router-link
      :to="{ name: 'article', params: { slug: article.slug } }"
      class="preview-link"
    >
      <h1>{{ article.title }}</h1>
      <p>{{ article.description }}</p>
      <span>Read more...</span>
    </router-link>
  </div>
</template>
<script>
import UserCard from "./UserCard.vue";

export default {
  components: { UserCard },
  props: {
    article: {
      slug: String,
      title: String,
      description: String,
      body: String,
      tagList: [String],
      createdAt: String,
      updatedAt: String,
      favorited: Boolean,
      favoritesCount: Number,
      author: {
        username: String,
        bio: String,
        image: String,
        following: Boolean,
      },
    },
  },
  methods: {},
};
</script>
<style scoped></style>
