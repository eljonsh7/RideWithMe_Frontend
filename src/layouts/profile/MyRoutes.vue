<template>
  <div class="w-full flex flex-col gap-3">
    <div>My Routes</div>
    <div class="flex justify-end w-full">
      <CustomButton @click="checkDriver">Add route</CustomButton>
    </div>
    <div class="flex flex-col gap-4">
      <RouteBanner
        v-for="(route, index) in routes"
        :key="index"
        :index="index"
        :route="route"
      />
    </div>
  </div>
  <RouteForm
    v-if="this.addRouteModal"
    :cities="this.cities"
    :maxSeats="this.user.car.seats_number - 1"
    @close-form="closeRouteForm"
  />
  <SelectCarForm v-if="this.chooseCarModal" @close-form="closeSelectCarForm" />
</template>

<script>
import CustomButton from "../../components/CustomButton.vue";
import RouteBanner from "../../components/RouteBanner.vue";

import Route from "../../services/route.js";
import RouteForm from "../../layouts/RouteForm.vue";
import City from "../../services/city.js";
import SelectCarForm from "@/layouts/profile/SelectCarForm.vue";
import Toast from "@/utils/toast";

export default {
  name: "MyRoutes",
  components: { SelectCarForm, RouteForm, CustomButton, RouteBanner },
  props: ["user"],
  emits: ["get-user"],
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
        this.user.id,
        this.$store.getters["users/getToken"]
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

      if (!this.user.car) {
        Toast.showWarning("Please add your car infos first.");
        this.chooseCarModal = true;
        return;
      }

      this.addRouteModal = true;
    },
    closeSelectCarForm(value = false) {
      if (value) this.$emit("get-user");
      this.chooseCarModal = false;
    },
  },
};
</script>
