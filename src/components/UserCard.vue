<template>
  <div class="article-meta">
    <a href=""><img :src="article.author.image" /></a>
    <div class="info">
      <a href="" class="author">{{ article.author.username }}</a>
      <span class="date">{{ mapDate }}</span>
    </div>
    <UserCardAuthorButton
      v-if="article.author.username === username"
    ></UserCardAuthorButton>
    <UserCardButton v-else></UserCardButton>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import UserCardAuthorButton from "./UserCardAuthorButton.vue";
import UserCardButton from "./UserCardButton.vue";
import { getMonth } from "../utils.js";
export default {
  components: { UserCardButton, UserCardAuthorButton },
  methods: {
    calDate: function (dateStr) {
      // "2016-02-18T03:22:56.637Z",
      const month = dateStr.slice(5, 7);
      const date = dateStr.slice(8, 10);
      return getMonth(month) + " / " + date;
    },
  },
  computed: {
    ...mapGetters({
      article: "articleDetail",
      username: "username",
    }),
    mapDate() {
      const dateStr = this.article.createdAt;
      const year = dateStr.slice(0, 4);
      const month = dateStr.slice(5, 7);
      const date = dateStr.slice(8, 10);
      return getMonth(month) + " " + date + "," + year;
    },
  },
};
</script>

<style></style>
