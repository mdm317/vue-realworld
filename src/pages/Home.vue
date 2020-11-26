<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>
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
          <h1 v-if="isLoading">...Loading</h1>
          <ArticlePreviewVue
            v-for="(article, index) in articleList"
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
                :class="{ activetag: idx == clickedId }"
                :key="idx"
                :id="idx"
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
import ArticlePreviewVue from "../components/ArticlePreview.vue";
import PagenationVue from "../components/Pagenation.vue";

export default {
  components: {
    ArticlePreviewVue,
    PagenationVue,
  },
  mounted() {
    this.$store.dispatch("getArticleList", { limit: this.pageArticleNum });
  },
  data() {
    return {
      currentPage: 1,
      clickedId: -1,
      maxPage: 16,
      pageArticleNum: 10,
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
      this.clickedId = e.target.id;
      this.$store.dispatch("getArticleList", {
        tag,
        limit: this.pageArticleNum,
      });
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
      const offset = (nxtPage - 1) * this.pageArticleNum;

      this.$store.dispatch("getArticleList", {
        offset,
        limit: this.pageArticleNum,
      });
      this.currentPage = nxtPage;
    },
  },
  computed: {
    isLoading: function () {
      return this.$store.getters.articleListLoading;
    },
    articleList: function () {
      return this.$store.getters.articleList;
    },
    fistPageNation: function () {
      return (
        parseInt((this.currentPage - 1) / this.pageArticleNum) *
          this.pageArticleNum +
        1
      );
    },
    lastPageNation: function () {
      return Math.min(
        parseInt((this.currentPage - 1) / this.pageArticleNum) *
          this.pageArticleNum +
          this.pageArticleNum,
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
.activetag {
  z-index: 2;
  background-color: darkslategray;
  cursor: pointer;
}
</style>
