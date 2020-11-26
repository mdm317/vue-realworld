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
      <div v-for="comment in newComment" :key="comment.id" class="card">
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
import Axios from "axios";
import { URL } from "../db";
import { getToken } from "../jwt/jwt";
export default {
  props: {
    slug: String,
    comments: Array,
  },
  data() {
    return {
      content: "",
      newComment: [],
    };
  },
  computed: {
    user: function () {
      return this.$store.getters.user;
    },
    commentList: function () {
      return [];
    },
  },
  methods: {
    calDate: function (dateStr) {
      // "2016-02-18T03:22:56.637Z",
      const month = dateStr.slice(5, 7);
      const date = dateStr.slice(8, 10);
      return month + " / " + date;
    },
    submitComment: async function () {
      const token = getToken();

      const response = await Axios.post(
        URL + `/articles/${this.slug}/comments`,
        {
          comment: {
            body: this.content,
          },
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      this.content = "";
      this.newComment = [response.data.comment, ...this.newComment];
    },
  },
};
</script>

<style></style>
