<template>
  <div id="app">
    <HeaderVue />
    <HomeVue />
    <FooterVue />
  </div>
</template>

<script>
import FooterVue from "./components/Footer.vue";
import HeaderVue from "./components/Header.vue";
import HomeVue from "./pages/Home.vue";

export default {
  components: {
    FooterVue,
    HeaderVue,
    HomeVue,
  },
};
</script>

<style></style>
