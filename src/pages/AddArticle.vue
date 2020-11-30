<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <form @submit.prevent="submitArticleForm">
            <fieldset>
              <fieldset class="form-group">
                <BaseInput
                  v-model="title"
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Article Title"
                />
              </fieldset>
              <fieldset class="form-group">
                <BaseInput
                  v-model="description"
                  type="text"
                  class="form-control"
                  placeholder="What's this article about?"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  v-bind:value="body"
                  v-on:input="inputBody"
                  class="form-control"
                  rows="8"
                  placeholder="Write your article (in markdown)"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <BaseInput
                  v-model="tags"
                  type="text"
                  class="form-control"
                  placeholder="Enter tags"
                />
                <div class="tag-list"></div>
              </fieldset>
              <button
                v-if="!isloading"
                class="btn btn-lg pull-xs-right btn-primary"
              >
                Publish Article
              </button>
              <button v-else class="btn btn-lg pull-xs-right btn-primary">
                ...loading
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseInput from "../components/BaseInput.vue";
export default {
  components: { BaseInput },

  data() {
    return {
      title: "",
      description: "",
      body: "",
      tags: "",
      isloading: false,
    };
  },
  methods: {
    parseTag(tags) {
      const reg = /#([a-z|A-Z]|[ㄱ-ㅎ|ㅏ-ㅣ|가-힣])+/g;
      return tags.match(reg);
    },
    inputBody(e) {
      this.body = e.target.value;
    },
    submitArticleForm() {
      if (this.isloading) {
        return;
      }
      this.isloading = true;
      console.log("submit");
      const tagList = this.parseTag(this.tags);
      const article = {
        title: this.title,
        description: this.description,
        body: this.body,
      };
      if (tagList && tagList.length > 0) {
        article.tagList = tagList;
      }
      this.$store.dispatch("addArticle", article).then((slug) => {
        this.$router.push({ name: "article", params: { slug } });
      });
    },
  },
};
</script>

<style></style>
