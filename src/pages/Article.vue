import axios from 'axios';
<template>
  <div class="article-page">
    <div class="banner">
      <div class="container">
        <h1>{{ article.slug }}</h1>

        <div class="article-meta">
          <a href=""><img :src="article.author.image" /></a>
          <div class="info">
            <a href="" class="author">{{ article.author.username }}</a>
            <span class="date">{{ calDate(article.createdAt) }}</span>
          </div>
          <button class="btn btn-sm btn-outline-secondary">
            <i class="ion-plus-round"></i>
            &nbsp;{{ "Follow" + "article.author.username" }}
            <span class="counter">(?)</span>
          </button>
          &nbsp;&nbsp;
          <button class="btn btn-sm btn-outline-primary">
            <i class="ion-heart"></i>
            &nbsp; Favorite Post <span class="counter">(?)</span>
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

          <button class="btn btn-sm btn-outline-secondary">
            <i class="ion-plus-round"></i>
            &nbsp;{{ "Follow" + "article.author.username" }}
            <span class="counter">(?)</span>
          </button>
          &nbsp;&nbsp;
          <button class="btn btn-sm btn-outline-primary">
            <i class="ion-heart"></i>
            &nbsp; Favorite Post <span class="counter">(?)</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Axios from "axios";
import { URL } from "../db";
export default {
  props: {
    slug: String,
  },
  mounted: function () {
    (async () => {
      try {
        const article = await Axios.get(URL + "/articles/${this.slug}");
        this.article = article;
      } catch (error) {
        throw Error(error);
      }
    })();
  },
  data() {
    return {
      article: {},
    };
  },
  methods: {
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
