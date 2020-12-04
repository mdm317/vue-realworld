<template>
  <div>
    <!-- <div v-for="value in objs" :key="value">
      {{ value }}
    </div> -->
    <t2 :a="a"></t2>
    <button @click="click">click</button>
  </div>
</template>

<script>
import t2 from "./t2.vue";
export default {
  components: { t2 },
  data() {
    return {
      objs: { 1: 1, 2: 2, 3: 3 },
      a: 1,
    };
  },
  methods: {
    click() {
      this.a = 4;
    },
  },
};
</script>

<style></style>
