<template>
  <nav>
    <ul class="pagination">
      <li v-if="isPre" class="page-item">
        <a @click="$emit('clickpage', 'pre')" class="page-link"> ◀</a>
      </li>
      <li
        v-for="pageNum of makePageList"
        :key="pageNum"
        class="page-item"
        :class="{ active: isCurrentPage(pageNum) }"
      >
        <a @click="$emit('clickpage', pageNum)" class="page-link">
          {{ pageNum }}</a
        >
      </li>
      <li v-if="isNxt" class="page-item">
        <a @click="$emit('clickpage', 'nxt')" class="page-link"> ▶</a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    isPre: Boolean,
    isNxt: Boolean,
    first: Number,
    last: Number,
    currentPage: Number,
  },
  methods: {
    isCurrentPage: function (pageNum) {
      return pageNum === this.currentPage;
    },
  },
  computed: {
    makePageList: function () {
      const pageList = [];

      for (let i = this.first; i <= this.last; ++i) {
        pageList.push(i);
      }

      return pageList;
    },
  },
};
</script>

<style>
nav {
  width: 100%;
  display: flex;
  justify-content: center;
}
.pagination {
  display: inline-block;
  padding-left: 0;
  margin-top: 1rem;
  margin-bottom: 1rem;
  border-radius: 0.25rem;
}
.page-link {
  position: relative;
  float: left;
  padding: 0.5rem 0.75rem;
  margin-left: -1px;
  color: #5cb85c;
  text-decoration: none;
  background-color: #fff;
  border: 1px solid #ddd;
  cursor: pointer;
}
.page-item.active .page-link,
.page-item.active .page-link:focus,
.page-item.active .page-link:hover {
  z-index: 2;
  color: #fff;
  cursor: default;
  background-color: #5cb85c;
  border-color: #5cb85c;
}
</style>
