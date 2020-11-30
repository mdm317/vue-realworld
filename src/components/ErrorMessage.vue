<template>
  <div>
    <ul v-for="(error, key) in errors" class="error-messages" :key="key">
      <li v-for="(errorMessage, index) in error" :key="index">
        {{ key + " " + errorMessage }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    errors: Object,
  },
};
</script>

<style></style>
