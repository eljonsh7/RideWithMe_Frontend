<template>
  <div
    class="flex justify-center items-center gap-2 mt-6 md:mb-6 w-full text-black/70"
  >
    <button
      v-if="currentPage > 1"
      class="p-1 w-8 aspect-square rounded-full light semibold border border-black/70"
      @click="pageChange(currentPage - 1)"
    >
      <chevron-left />
    </button>
    <button
      v-if="shouldShowStartEllipsis"
      class="p-1 w-8 aspect-square rounded-full light semibold border border-black/70"
      @click="pageChange(1)"
    >
      1
    </button>
    <button
      v-if="shouldShowStartEllipsisDots"
      class="p-1 w-8 aspect-square rounded-full light semibold border border-black/70"
      disabled
    >
      ...
    </button>
    <button
      v-for="a in visiblePages"
      :key="a"
      :class="{
        'bg-black/70 text-white border-transparent': a === currentPage,
      }"
      class="p-1 w-8 aspect-square rounded-full light semibold border border-black/70"
      @click="pageChange(a)"
    >
      {{ a }}
    </button>
    <button
      v-if="shouldShowEndEllipsisDots"
      class="p-1 w-8 aspect-square rounded-full light semibold border border-black/70"
      disabled
    >
      ...
    </button>
    <button
      v-if="shouldShowEndEllipsis"
      class="p-1 w-8 aspect-square rounded-full light semibold border border-black/70"
      @click="pageChange(totalPages)"
    >
      {{ totalPages }}
    </button>
    <button
      v-if="currentPage < totalPages"
      class="p-1 w-8 aspect-square rounded-full light semibold border border-black/70"
      @click="pageChange(currentPage + 1)"
    >
      <chevron-right />
    </button>
  </div>
</template>

<script>
import ChevronLeft from "../components/icons/ChevronLeft.vue";
import ChevronRight from "../components/icons/ChevronRight.vue";

export default {
  name: "PaginationBar",
  components: { ChevronRight, ChevronLeft },
  props: ["totalRoutes", "currentPage", "limitPerPage"],
  emits: ["change-page"],
  computed: {
    isLoggedIn() {
      return JSON.parse(sessionStorage.getItem("isLoggedIn"));
    },
    totalPages() {
      return Math.ceil(this.totalRoutes / this.limitPerPage);
    },
    shouldShowStartEllipsis() {
      if (this.totalPages > 5) return this.currentPage > 3;
      else return false;
    },
    shouldShowStartEllipsisDots() {
      if (this.totalPages > 5) return this.currentPage > 4;
      else return false;
    },
    shouldShowEndEllipsis() {
      if (this.totalPages > 5) return this.currentPage < this.totalPages - 2;
      else return false;
    },
    shouldShowEndEllipsisDots() {
      if (this.totalPages > 5) return this.currentPage < this.totalPages - 3;
      else return false;
    },
    visiblePages() {
      const visiblePageCount = 5;
      const pages = [];

      if (this.totalPages <= visiblePageCount) {
        for (let i = 1; i <= this.totalPages; i++) {
          pages.push(i);
        }
      } else {
        let startPage = Math.max(1, this.currentPage - 2);
        let endPage = Math.min(
          this.totalPages,
          startPage + visiblePageCount - 1
        );
        if (endPage - startPage < visiblePageCount - 1) {
          startPage = Math.max(1, endPage - visiblePageCount + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
          pages.push(i);
        }
      }

      return pages;
    },
  },
  methods: {
    pageChange(a) {
      this.$emit("change-page", a);
    },
  },
};
</script>
