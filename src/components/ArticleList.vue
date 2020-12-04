<template>
  <div>
    <h1 v-if="isLoading">...Loading</h1>
    <h1 v-else-if="articleList && articleList.length === 0">...no article</h1>
    <ArticlePreview
      v-for="(article, index) in articleList"
      :key="index"
      :article="article"
    />
    <Pagenation
      :first="fistPageNation"
      :last="lastPageNation"
      :isPre="currentPage !== 1"
      :isNxt="currentPage !== maxPage"
      :currentPage="currentPage"
      @clickpage="clickPagelist"
    >
    </Pagenation>
  </div>
</template>

<script>
import ArticlePreview from "./ArticlePreview.vue";
import Pagenation from "./Pagenation.vue";
import { mapGetters } from "vuex";
export default {
  components: { ArticlePreview, Pagenation },
  watch: {
    favorited() {
      this.currentPage = 1;
    },
  },
  mounted() {
    this.getArticleAgain();
  },
  props: {
    feedState: String,
    maxPage: Number,
    pageArticleNum: Number,
    username: String,
    favorited: Boolean,
  },
  data() {
    return { currentPage: 1 };
  },
  methods: {
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
      this.getArticleAgain(offset);
      this.currentPage = nxtPage;
    },
    getArticleAgain(offset = 0) {
      const payload = {
        limit: this.pageArticleNum,
        tag: this.selectedTag,
        offset,
      };
      if (this.favorited) {
        payload.favorited = this.username;
      } else if (this.feedState === "USER") {
        payload.username = this.username;
      }
      // console.log("[payload]:", payload);
      console.log("실행");

      this.$store.dispatch("getArticleList", payload);
    },
  },
  computed: {
    ...mapGetters({
      isLoading: "articleListLoading",
    }),
    ...mapGetters(["articleList"]),
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

<style></style>
