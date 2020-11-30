<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <ErrorMessage :errors="errors" v-if="errors"> </ErrorMessage>

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
                <input
                  @keypress.enter.prevent="addTag"
                  type="text"
                  class="form-control"
                  placeholder="Enter tags"
                />
                <div class="tag-list">
                  <span
                    v-for="tag of tagList"
                    class="tag-default tag-pill"
                    :key="tag"
                  >
                    <i :id="tag" @click="clickDeleteTag" class="ion-close-round"
                      >❌</i
                    >
                    {{ tag }}
                  </span>
                </div>
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
import ErrorMessage from "../components/ErrorMessage.vue";
export default {
  components: { BaseInput, ErrorMessage },
  mounted: async function () {
    const { slug } = this.$route.params;
    if (slug) {
      await this.$store.dispatch("getArticleDetail", slug);
      const article = this.$store.getters.articleDetail;
      this.title = article.title;
      this.description = article.description;
      this.body = article.body;
      this.tagList = article.tagList;
    }
  },
  data() {
    return {
      title: "",
      description: "",
      body: "",
      tags: "",
      isloading: false,
      tagList: [],
    };
  },
  methods: {
    addTag(e) {
      const tag = e.target.value.trim();
      if (tag) {
        for (const tagEl of this.tagList) {
          if (tagEl === tag) {
            return;
          }
        }
        this.tagList.push(tag);
        e.target.value = "";
      }
    },
    inputBody(e) {
      this.body = e.target.value;
    },
    submitArticleForm() {
      if (this.isloading) {
        return;
      }
      this.isloading = true;
      const article = {
        title: this.title,
        description: this.description,
        body: this.body,
      };
      if (this.tagList) {
        article.tagList = this.tagList;
      }
      this.$store.dispatch("addArticle", article).then((slug) => {
        this.$router.push({ name: "article", params: { slug } });
      });
    },
    clickDeleteTag(e) {
      this.tagList = this.tagList.filter((tag) => tag !== e.target.id);
    },
  },
  computed: {
    errors() {
      return this.$store.getters.addArticleErr;
    },
  },
};
</script>

<style>
.ion-close-round {
  cursor: pointer;
}
</style>
