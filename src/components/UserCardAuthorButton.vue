<template>
  <span>
    <router-link
      to="{name:addArticle}"
      class="btn btn-sm btn-outline-secondary"
    >
      <i class="ion-edit"> </i>
      <span> &nbsp;</span>
      <span> 📋 Edit Article </span>
    </router-link>
    <button @click="clickDeleteBtn" class="btn btn-sm btn-outline-danger">
      <i class="ion-trash-a"> </i>
      <span> &nbsp;</span>
      <span> 🗑 Delete Article </span>
    </button>
  </span>
</template>

<script>
export default {
  methods: {
    clickDeleteBtn() {
      this.$store.dispatch("deleteArticle", this.slug).then(() => {
        this.$router.push({ name: "home" });
      });
    },
  },
  computed: {
    slug() {
      return this.$store.getters.articleDetail.slug;
    },
  },
};
</script>

<style></style>
