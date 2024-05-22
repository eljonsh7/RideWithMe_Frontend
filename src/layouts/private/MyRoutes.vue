<template>
  <div class="w-full flex flex-col gap-3">
    <div>My Routes</div>
    <div class="flex justify-end w-full">
      <custom-button @click="checkDriver">Add route</custom-button>
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
    @close-form="closeRouteForm"
  />
  <select-car-form
    v-if="this.chooseCarModal"
    @close-form="this.chooseCarModal = false"
  />
</template>

<script>
import CustomButton from "../../components/CustomButton.vue";
import RouteBanner from "../../components/RouteBanner.vue";

import Route from "../../services/route.js";
import RouteForm from "../../layouts/RouteForm.vue";
import City from "../../services/city.js";
import SelectCarForm from "@/layouts/private/SelectCarForm.vue";
import Toast from "@/utils/toast";

export default {
  name: "MyRoutes",
  components: { SelectCarForm, RouteForm, CustomButton, RouteBanner },
  props: ["user"],
  beforeMount() {
    this.getMyRoutes();
    this.getCities();
  },
  data() {
    return {
      addRouteModal: false,
      chooseCarModal: false,
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
      this.routes = response.data;
    },
    async getCities() {
      const response = await City.getCities();
      this.cities = response.cities;
    },
    closeRouteForm(object) {
      if (object) this.getMyRoutes();
      this.addRouteModal = false;
    },
    checkDriver() {
      if (!this.user || this.user.role !== "driver") {
        Toast.showWarning(
          "You should update you profile and make yourself a driver."
        );
        return;
      }

      if (!this.user.car_id) {
        Toast.showWarning("Please add your car infos first.");
        this.chooseCarModal = true;
        return;
      }

      this.addRouteModal = true;
    },
  },
};
</script>
