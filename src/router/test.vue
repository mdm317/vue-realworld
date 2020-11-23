<template>
  <div>
    <div v-for="value in objs" :key="value">
      {{ value }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      objs: { 1: 1, 2: 2, 3: 3 },
    };
  },
};
</script>

<style></style>
