<template>
  <div class="w-full p-5 gap-5 grid md:grid-cols-2 grid-cols-1">
    <div class="flex flex-col gap-3">
      <div class="flex justify-center text-3xl font-extrabold">Cities</div>
      <div class="flex w-full justify-end">
        <custom-button
          :fill="true"
          class="w-full"
          @click="isAddCityModalOpen = true"
          >Add city
        </custom-button>
      </div>
      <div class="flex flex-col gap-2">
        <admin-city-card
          v-for="(city, index) in cities"
          :key="city.id"
          :city="city"
          :index="index"
          :selectedCityId="this.selectedCityId"
          @select-city="(id) => (this.selectedCityId = id)"
          @delete-city="deleteCity"
        ></admin-city-card>
      </div>

      <div
        v-if="this.cities.length === 0"
        class="w-full text-black/50 text-sm text-center"
      >
        No cities here!
      </div>
    </div>
    <div class="flex flex-col gap-3">
      <div class="flex justify-center text-3xl font-extrabold">Locations</div>
      <div v-if="this.selectedCityId !== null" class="flex w-full justify-end">
        <custom-button
          :fill="true"
          class="w-full"
          @click="isAddLocationModalOpen = true"
          >Add location
        </custom-button>
      </div>
      <div class="flex flex-col gap-2">
        <admin-location-card
          v-for="(location, index) in locations"
          :key="location.id"
          :cityId="this.selectedCityId"
          :index="index"
          :location="location"
          @delete-location="deleteLocation"
        ></admin-location-card>
      </div>
      <div
        v-if="this.locations.length === 0"
        class="w-full text-black/50 text-sm text-center"
      >
        {{
          this.selectedCityId !== null
            ? "No locations here!"
            : "No city celected!"
        }}
      </div>
    </div>
  </div>
  <admin-city-form
    v-if="this.isAddCityModalOpen"
    @close-form="this.closeCityForm"
  >
  </admin-city-form>
  <admin-location-form
    v-if="this.isAddLocationModalOpen"
    :selectedCityId="this.selectedCityId"
    @close-form="this.closeLocationForm"
  >
  </admin-location-form>
</template>

<script>
import AdminCityCard from "../components/AdminCityCard.vue";
import AdminLocationCard from "../components/AdminLocationCard.vue";
import AdminCityForm from "../layouts/AdminCityForm.vue";
import AdminLocationForm from "../layouts/AdminLocationForm.vue";
import CustomButton from "../../components/CustomButton.vue";

import City from "../services/city.js";
import Location from "../services/location.js";

export default {
  name: "AdminCitiesPage",
  components: {
    AdminLocationForm,
    AdminCityForm,
    AdminCityCard,
    AdminLocationCard,
    CustomButton,
  },
  data() {
    return {
      isAddCityModalOpen: false,
      isAddLocationModalOpen: false,
      locationValue: "",
      cities: [],
      locations: [],
      selectedCityId: null,
    };
  },
  beforeMount() {
    this.getCities();
  },
  watch: {
    selectedCityId(newValue) {
      if (newValue !== null) {
        this.getLocations();
      }
    },
  },
  methods: {
    async closeCityForm(arg) {
      if (arg) await this.getCities();
      this.isAddCityModalOpen = false;
    },
    async closeLocationForm(arg) {
      if (arg) await this.getLocations();

      this.isAddLocationModalOpen = false;
    },
    async getCities() {
      const cities = await City.getCities(sessionStorage.getItem("token"));
      if (cities) this.cities = cities.data.cities;
    },
    async deleteCity(obj) {
      const response = await City.deleteCity(
        obj.id,
        sessionStorage.getItem("token")
      );
      if (response) {
        this.cities.splice(obj.index, 1);
      }
    },
    async getLocations() {
      const locations = await Location.getLocations(
        this.selectedCityId,
        sessionStorage.getItem("token")
      );
      if (locations) this.locations = locations.data.locations;
    },
    async deleteLocation(index) {
      this.locations.splice(index, 1);
    },
  },
};
</script>
