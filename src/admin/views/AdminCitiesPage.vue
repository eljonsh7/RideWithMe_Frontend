<template>
  <div class="w-full p-5 gap-5 grid md:grid-cols-2 grid-cols-1">
    <div class="flex flex-col gap-3">
      <div class="flex justify-center text-3xl font-extrabold">Cities</div>
      <div class="flex w-full justify-end">
        <CustomButton
          :fill="true"
          class="w-full"
          @click="isAddCityModalOpen = true"
          >Add city
        </CustomButton>
      </div>
      <div class="flex flex-col gap-2">
        <AdminCityCard
          v-for="(city, index) in cities"
          :key="city.id"
          :city="city"
          :index="index"
          :selectedCityId="this.selectedCityId"
          @select-city="(id) => (this.selectedCityId = id)"
          @delete-city="deleteCity"
        />
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
        <CustomButton
          :fill="true"
          class="w-full"
          @click="isAddLocationModalOpen = true"
          >Add location
        </CustomButton>
      </div>
      <div class="flex flex-col gap-2">
        <AdminLocationCard
          v-for="(location, index) in locations"
          :key="location.id"
          :cityId="this.selectedCityId"
          :index="index"
          :location="location"
          @delete-location="deleteLocation"
        />
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
  <AdminCityForm
    v-if="this.isAddCityModalOpen"
    @close-form="this.closeCityForm"
  />
  <AdminLocationForm
    v-if="this.isAddLocationModalOpen"
    :selectedCityId="this.selectedCityId"
    @close-form="this.closeLocationForm"
  />
</template>

<script>
import AdminCityCard from "../components/AdminCityCard.vue";
import AdminLocationCard from "../components/AdminLocationCard.vue";
import AdminCityForm from "../layouts/AdminCityForm.vue";
import AdminLocationForm from "../layouts/AdminLocationForm.vue";
import CustomButton from "../../components/form/CustomButton.vue";

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
    if (
      !this.$store.getters["users/getUser"] ||
      this.$store.getters["users/getUser"].is_admin === 0
    )
      this.$router.push("/");
    else this.getCities();
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
      const cities = await City.getCities(
        this.$store.getters["users/getToken"]
      );
      if (cities) this.cities = cities.cities;
    },
    async deleteCity(obj) {
      this.cities.splice(obj.index, 1);
    },
    async getLocations() {
      const locations = await Location.getLocations(
        this.selectedCityId,
        this.$store.getters["users/getToken"]
      );
      if (locations) this.locations = locations.locations;
    },
    async deleteLocation(index) {
      this.locations.splice(index, 1);
    },
  },
};
</script>
