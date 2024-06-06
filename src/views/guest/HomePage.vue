<template>
  <div class="flex flex-col gap-4">
    <RouteFilters @filter-routes="addFilters" />
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 mx-16 my-8 gap-14"
    >
      <RouteCard v-for="route in routes" :key="route.id" :route="route" />
    </div>
    <PaginationBar
      v-if="this.totalRoutes > this.pageSize"
      :currentPage="this.currentPage"
      :limitPerPage="this.pageSize"
      :totalRoutes="this.totalRoutes"
      @change-page="this.changePage"
    />
  </div>
</template>

<script>
import Route from "../../services/route.js";
import PaginationBar from "../../layouts/ui/PaginationBar.vue";
import RouteCard from "../../components/ui/RouteCard.vue";
import RouteFilters from "../../layouts/form/RouteFilters.vue";

export default {
  components: {
    RouteFilters,
    RouteCard,
    PaginationBar,
  },
  data() {
    return {
      routes: [],
      filters: null,
      currentPage: 1,
      totalRoutes: 0,
      pageSize: 6,
    };
  },
  beforeMount() {
    this.token = sessionStorage.getItem("token");
    this.getRoutes();
  },
  methods: {
    changePage(page) {
      if (this.filters) this.getFilteredRoutes(this.filters, page);
      else this.getRoutes(page);
    },
    async getRoutes(pageNumber = this.currentPage) {
      this.filters = null;
      this.currentPage = pageNumber;
      const response = await Route.getRoutes({
        page: this.currentPage,
        pageSize: this.pageSize,
      });
      if (response) {
        this.routes = response.routes.data;
        this.totalRoutes = response.routes.total;
      }
    },
    async getFilteredRoutes(filters, pageNumber = this.currentPage) {
      this.currentPage = pageNumber;
      filters.page = this.currentPage;
      filters.pageSize = this.pageSize;
      const response = await Route.getFilteredRoutes(
        filters,
        this.$store.getters["users/getToken"]
      );
      if (response) {
        this.routes = response.routes.data;
        this.totalRoutes = response.routes.total;
      }
    },
    addFilters(filters) {
      this.filters = filters;
      this.getFilteredRoutes(filters, 1);
    },
  },
};
</script>

<style scoped>
@font-face {
  font-family: mySansation;
  src: url(../../assets/fonts/Sansation_Light.ttf);
}

* {
  font-family: mySansation sans-serif;
}
</style>
