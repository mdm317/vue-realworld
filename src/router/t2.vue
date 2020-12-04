<template>
  <div>{{ a }}</div>
</template>

<script>
export default {
  props: {
    a: Number,
  },
  mounted() {
    console.log("mount");
  },
  updated() {
    console.log("update");
  },
};
</script>

<style></style>
