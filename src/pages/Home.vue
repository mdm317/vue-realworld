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
                <a
                  @click.prevent="clickUserFeed"
                  class="nav-link"
                  :class="{
                    disabled: username === undefined,
                    active: feedState === 'USER',
                  }"
                  href=""
                >
                  Your Feed
                </a>
              </li>
              <li class="nav-item">
                <a
                  @click.prevent="clickGlobalFeed"
                  class="nav-link"
                  :class="{ active: feedState === 'GLOBAL' }"
                  href=""
                  >Global Feed</a
                >
              </li>
            </ul>
          </div>
          <ArticleList
            :maxPage="maxPage"
            :feedState="feedState"
            :pageArticleNum="pageArticleNum"
            :username="username"
          ></ArticleList>
        </div>

        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>

            <div class="tag-list">
              <a
                v-for="(tag, idx) in tags"
                class="tag-pill tag-default home-tag"
                :class="{ activetag: idx == clickedId }"
                :key="idx"
                :id="idx"
                @click="clickTag"
                >{{ tag }}</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ArticleList from "../components/ArticleList.vue";

export default {
  components: {
    ArticleList,
  },
  mounted() {
    this.$store.dispatch("getTags");
  },
  data() {
    return {
      feedState: "GLOBAL",
      clickedId: -1,
      maxPage: 16,
      pageArticleNum: 10,
      selectedTag: "",
    };
  },
  methods: {
    clickTag: async function (e) {
      const tag = e.target.innerText;
      if (this.clickedId === e.target.id) {
        this.clickedId = -1;
        this.selectedTag = "";
      } else {
        this.clickedId = e.target.id;
        this.selectedTag = tag;
      }

      this.getArticleAgain();
      this.currentPage = 1;
    },

    clickUserFeed() {
      if (!this.username) {
        return;
      }
      this.feedState = "USER";
      this.getArticleAgain();

      this.currentPage = 1;
      // clickedId: -1,
      // maxPage: 16, 변경할 수 있는 api 가 없음
    },
    clickGlobalFeed() {
      this.feedState = "GLOBAL";
      this.getArticleAgain();
      this.currentPage = 1;
      // clickedId: -1,
      // maxPage: 16, 변경할 수 있는 api 가 없음
    },
    getArticleAgain(offset = 0) {
      const payload = {
        limit: this.pageArticleNum,
        tag: this.selectedTag,
        offset,
      };
      if (this.feedState === "USER") {
        payload.username = this.username;
      }
      this.$store.dispatch("getArticleList", payload);
    },
  },
  computed: {
    ...mapGetters({
      isLoading: "articleListLoading",
    }),
    ...mapGetters(["articleList", "username", "tags"]),
  },
};
</script>
<style>
.home-tag:hover {
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
