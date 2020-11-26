<template>
  <div v-if="article" class="article-page">
    <div class="banner">
      <div class="container">
        <h1>{{ article.slug }}</h1>

        <div class="article-meta">
          <a href=""><img :src="article.author.image" /></a>
          <div class="info">
            <a href="" class="author">{{ article.author.username }}</a>
            <span class="date">{{ calDate(article.createdAt) }}</span>
          </div>
          <button
            @click="clickFollow"
            class="btn btn-sm btn-outline-secondary"
            :class="{ active: article.author.following }"
          >
            <i class="ion-plus-round"></i>
            &nbsp;{{ "Follow " + article.author.username }}
            <span class="counter">()</span>
          </button>
          &nbsp;&nbsp;
          <button
            class="btn btn-sm btn-outline-primary"
            :class="{ active: article.favorited }"
          >
            <i class="ion-heart"></i>
            &nbsp; Favorite Post
            <span class="counter">({{ article.favoritesCount }})</span>
          </button>
        </div>
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

      <hr />

      <div class="article-actions">
        <div class="article-meta">
          <a href=""><img :src="article.author.image" /></a>
          <div class="info">
            <a href="" class="author">{{ article.author.username }}</a>
            <span class="date">{{ calDate(article.createdAt) }}</span>
          </div>

          <button
            class="btn btn-sm btn-outline-secondary"
            :class="{ active: article.author.following }"
          >
            <i class="ion-plus-round"></i>
            &nbsp;{{ "Follow " + article.author.username }}
            <span class="counter">()</span>
          </button>
          &nbsp;&nbsp;
          <button
            class="btn btn-sm btn-outline-primary"
            :class="{ active: article.favorited }"
          >
            <i class="ion-heart"></i>
            &nbsp; Favorite Post
            <span class="counter">({{ article.favoritesCount }})</span>
          </button>
        </div>
      </div>
      <CommentBox v-if="comments" :comments="this.comments" :slug="this.slug" />
    </div>
  </div>
</template>

<script>
import Axios from "axios";
import { URL } from "../db";
import CommentBox from "../components/CommentBox.vue";
import { getToken } from "../jwt/jwt";
export default {
  components: { CommentBox },
  props: {
    slug: String,
  },
  mounted: function () {
    (async () => {
      try {
        const articleResponse = await Axios.get(URL + `/articles/${this.slug}`);
        this.article = articleResponse.data.article;
        const commentResponse = await Axios.get(
          URL + `/articles/${this.slug}/comments`
        );
        this.comments = commentResponse.data.comments;
      } catch (error) {
        throw Error(error);
      }
    })();
  },
  data() {
    return {
      article: null,
      comments: null,
    };
  },
  // GET /api/articles/:slug/comments
  methods: {
    clickFollow: async function () {
      const token = getToken();
      const username = this.article.author.username;
      const response = await Axios.post(URL + `profiles/${username}/follow`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      this.$store.commit("loginSuc", response.data.user);
      ///api/profiles/:username/follow
    },
    calDate: function (dateStr) {
      // "2016-02-18T03:22:56.637Z",
      const month = dateStr.slice(5, 7);
      const date = dateStr.slice(8, 10);
      return month + " / " + date;
    },
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
  },
};
</script>

<style></style>
