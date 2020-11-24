<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>
    <h1>{{ user }}</h1>
    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <a class="nav-link disabled" href="">Your Feed</a>
              </li>
              <li class="nav-item">
                <a class="nav-link active" href="">Global Feed</a>
              </li>
            </ul>
          </div>

          <ArticlePreviewVue
            v-for="(article, index) in articlelist"
            :key="index"
            :article="article"
          />
        </div>

        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>

            <div class="tag-list">
              <a
                v-for="(tag, idx) in tags"
                class="tag-pill tag-default"
                :key="idx"
                @click="clickTag"
                >{{ tag }}</a
              >
            </div>
          </div>
        </div>
        <PagenationVue
          :first="fistPageNation"
          :last="lastPageNation"
          :isPre="currentPage !== 1"
          :isNxt="currentPage !== maxPage"
          :currentPage="currentPage"
          @clickpage="clickPagelist"
        >
        </PagenationVue>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ArticlePreviewVue from "../components/ArticlePreview.vue";
import { URL } from "../db";
import PagenationVue from "../components/Pagenation.vue";

export default {
  components: {
    ArticlePreviewVue,
    PagenationVue,
  },
  mounted() {
    (async () => {
      try {
        const response = await axios.get(
          URL + `/articles?limit=${this.pageArticleNum}`
        );
        this.articlelist = response.data.articles;
      } catch (error) {
        console.log(error);
      }
    })();
  },
  data() {
    return {
      currentPage: 1,
      maxPage: 16,
      pageArticleNum: 10,
      articlelist: [],
      tags: [
        "programming",
        "javascript",
        "emberjs",
        "angularjs",
        "react",
        "mean",
        "node",
        "rails",
      ],
    };
  },
  methods: {
    clickTag: async function (e) {
      const tag = e.target.innerText;
      const response = await axios.get(
        URL + `/articles?limit=${this.pageArticleNum}&tag=${tag}`
      );
      this.articlelist = response.data.articles;
    },
    clickPagelist: async function (nxtPage) {
      if (nxtPage === "pre") {
        nxtPage = this.currentPage - 1;
      }
      if (nxtPage === "nxt") {
        nxtPage = this.currentPage + 1;
      }
      if (nxtPage === this.currentPage) {
        return;
      }
      if (nxtPage > this.maxPage) {
        return;
      }
      window.scrollTo(0, 0);
      const preArticleNum = (nxtPage - 1) * 10;
      const response = await axios.get(
        URL + `/articles?limit=${this.pageArticleNum}&offset=${preArticleNum}`
      );
      this.articlelist = response.data.articles;
      this.currentPage = nxtPage;
    },
  },
  computed: {
    user: function () {
      return this.$store.getters.user;
    },
    fistPageNation: function () {
      return parseInt((this.currentPage - 1) / 10) * 10 + 1;
    },
    lastPageNation: function () {
      return Math.min(
        parseInt((this.currentPage - 1) / 10) * 10 + 10,
        this.maxPage
      );
    },
  },
};
</script>
<style>
.tag-default:hover {
  z-index: 2;
  background-color: darkslategray;
  cursor: pointer;
}
</style>
