<template>
  <div class="row">
    <div class="col-xs-12 col-md-8 offset-md-2">
      <form @submit.prevent="submitComment" class="card comment-form">
        <div class="card-block">
          <textarea
            class="form-control"
            placeholder="Write a comment..."
            rows="3"
            v-model="content"
          ></textarea>
        </div>
        <div class="card-footer">
          <img :src="user.image" class="comment-author-img" />
          <button class="btn btn-sm btn-primary">Post Comment</button>
        </div>
      </form>

      <div v-for="comment in comments" :key="comment.id" class="card">
        <div class="card-block">
          <p class="card-text">
            {{ comment.body }}
          </p>
        </div>
        <div class="card-footer">
          <a href="" class="comment-author">
            <img :src="comment.author.image" class="comment-author-img" />
          </a>
          &nbsp;
          <a href="" class="comment-author">{{ comment.author.username }}</a>
          <span class="date-posted">{{ calDate(comment.createdAt) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: {
    slug: String,
  },
  data() {
    return {
      content: "",
    };
  },

  computed: {
    ...mapGetters(["comments", "user"]),
  },

  methods: {
    calDate: function (dateStr) {
      // "2016-02-18T03:22:56.637Z",
      const month = dateStr.slice(5, 7);
      const date = dateStr.slice(8, 10);
      return month + " / " + date;
    },
    submitComment: function () {
      this.$store
        .dispatch("addComment", {
          slug: this.slug,
          content: this.content,
        })
        .then(() => {
          this.content = "";
        });
    },
  },
};
</script>

<style></style>
