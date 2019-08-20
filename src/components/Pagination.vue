<template>
  <div v-if="totalPages() > 0" class="pagination-wrapper">
    <button v-if="showPreviousLink()" class="pagination-btn" v-on:click="updatePage(currentPage - 1)"> ← </button>
    {{ currentPage + 1 }} of {{ totalPages() }}
    <button v-if="showNextLink()" class="pagination-btn" v-on:click="updatePage(currentPage + 1)"> → </button>
  </div>
</template>

<script>
  export default {
  name: 'pagination',
  props: {
    allJsonData: Array,
    currentPage: Number,
    pageSize: Number
  },
  methods: {
    updatePage(pageNumber) {
      this.$emit('page:update', pageNumber);
    },
    totalPages() {
      return Math.ceil(this.allJsonData.length / this.pageSize);
    },
    showPreviousLink() {
      return this.currentPage == 0 ? false : true;
    },
    showNextLink() {
      return this.currentPage == (this.totalPages() - 1) ? false : true;
    }
  }
}
</script>

<style>

.pagination-btn {
  cursor: pointer;
}

.pagination-wrapper {
  text-align: center;
  padding-bottom: 30px;
}

</style>