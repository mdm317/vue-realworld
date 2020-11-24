<template>
  <div id="app">
    <HeaderVue />
    <router-view></router-view>
    <FooterVue />
  </div>
</template>

<script>
import HeaderVue from "./components/Header.vue";
import FooterVue from "./components/Footer.vue";
import { getToken } from "./jwt/jwt.js";
export default {
  name: "App",
  components: {
    HeaderVue,
    FooterVue,
  },
  mounted() {
    const token = getToken();

    if (token) {
      this.$store.dispatch("getUser", token);
    }
  },
};
</script>

<style></style>
