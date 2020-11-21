<template>
  <div class="article-preview">
    <div class="article-meta">
      <a href="profile.html"><img :src="article.author.image" /></a>
      <div class="info">
        <a href="" class="author">{{ article.author.username }}</a>
        <span class="date">{{ calDate(article.createdAt) }}</span>
      </div>
      <button class="btn btn-outline-primary btn-sm pull-xs-right">
        <i class="ion-heart"></i> {{ article.favoritesCount }}
      </button>
    </div>
    <a href="" class="preview-link">
      <h1>{{ article.title }}</h1>
      <p>{{ article.description }}</p>
      <span>Read more...</span>
    </a>
  </div>
</template>
<script>
export default {
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
  methods: {
    calDate: function (dateStr) {
      // "2016-02-18T03:22:56.637Z",
      const month = dateStr.slice(5, 7);
      const date = dateStr.slice(8, 10);
      return month + " / " + date;
    },
  },
};
</script>
<style scoped></style>
