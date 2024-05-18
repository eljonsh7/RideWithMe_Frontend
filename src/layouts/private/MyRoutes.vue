<template>
  <div class="w-full flex flex-col gap-3">
    <div>My Routes</div>
    <div class="flex justify-end w-full" v-if="isUserDriver()">
      <custom-button @click="this.addRouteModal = true"
        >Add route
      </custom-button>
    </div>
    <div class="flex flex-col gap-4">
      <route-banner
        v-for="(route, index) in routes"
        :key="index"
        :index="index"
        :route="route"
      />
    </div>
  </div>
  <route-form
    v-if="this.addRouteModal"
    :cities="this.cities"
    @close-form="closeForm"
  />
</template>

<script>
import CustomButton from "../../components/CustomButton.vue";
import RouteBanner from "../../components/RouteBanner.vue";

import Route from "../../services/route.js";
import RouteForm from "../../layouts/RouteForm.vue";
import City from "../../services/city.js";

export default {
  name: "MyRoutes",
  components: { RouteForm, CustomButton, RouteBanner },
  beforeMount() {
    this.getMyRoutes();
    this.getCities();
  },
  data() {
    return {
      addRouteModal: false,
      user: this.user = this.$store.getters["users/getUser"],
      routes: [],
      cities: [],
    };
  },
  methods: {
    async getMyRoutes() {
      const response = await Route.getUserRoutes(
        this.user ? this.user.id : "2e1ba8c7-5871-441f-8909-f78103cb3c1d",
        sessionStorage.getItem("token")
      );
      console.log(response);
      this.routes = response.data;
    },
    async getCities() {
      const response = await City.getCities();
      this.cities = response.cities;
    },
    closeForm(object) {
      if (object) this.getMyRoutes();
      this.addRouteModal = false;
    },
    isUserDriver(){
      return this.user && this.user.role == "driver";
    },
  },
};
</script>
