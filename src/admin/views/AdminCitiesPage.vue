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
          :id="city.id"
          :key="city.id"
          :country="city.country"
          :index="index"
          :name="city.name"
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
          :id="location.id"
          :key="location.id"
          :index="index"
          :name="location.name"
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
  <custom-modal
    v-if="this.isAddCityModalOpen"
    @close-modal="
      this.isAddCityModalOpen = false;
      this.cityValue = '';
    "
  >
    <div class="w-full flex flex-col gap-5">
      <div>Add city:</div>
      <div class="flex gap-2 md:flex-row flex-col">
        <input
          v-model="this.countryValue"
          class="px-4 py-3 rounded-lg outline-none border-2 border-gray-300 w-full"
          placeholder="Country"
          type="text"
          value="Kosova"
        />
        <input
          v-model="this.cityValue"
          autofocus
          class="px-4 py-3 rounded-lg outline-none border-2 border-gray-300 w-full"
          placeholder="City name"
          type="text"
        />
      </div>
      <div class="flex justify-end">
        <custom-button :fill="true" @click="addCity">Add</custom-button>
      </div>
    </div>
  </custom-modal>
  <custom-modal
    v-if="this.isAddLocationModalOpen"
    @close-modal="
      this.isAddLocationModalOpen = false;
      this.locationValue = '';
    "
  >
    <div class="w-full flex flex-col gap-5">
      <div>Add city:</div>
      <div class="flex gap-2 md:flex-row flex-col">
        <input
          v-model="this.locationValue"
          autofocus
          class="px-4 py-3 rounded-lg outline-none border-2 border-gray-300 w-full"
          placeholder="City name"
          type="text"
        />
      </div>
      <div class="flex justify-end">
        <custom-button :fill="true" @click="addLocation">Add</custom-button>
      </div>
    </div>
  </custom-modal>
</template>

<script>
import AdminCityCard from "../components/AdminCityCard.vue";
import AdminLocationCard from "../components/AdminLocationCard.vue";
import CustomButton from "../../components/CustomButton.vue";
import CustomModal from "../../layouts/CustomModal.vue";

import City from "../services/city.js";
import Location from "../services/location.js";

export default {
  name: "AdminCitiesPage",
  components: {
    AdminCityCard,
    AdminLocationCard,
    CustomButton,
    CustomModal,
  },
  data() {
    return {
      isAddCityModalOpen: false,
      isAddLocationModalOpen: false,
      locationValue: "",
      cities: [],
      locations: [],
      cityValue: "",
      countryValue: "Kosovë",
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
    async addCity() {
      if (this.cityValue !== "" && this.countryValue !== "") {
        const obj = {
          name: this.cityValue,
          country: this.countryValue,
        };
        this.isAddCityModalOpen = false;
        this.cityValue = "";
        const response = await City.addCity(
          obj,
          sessionStorage.getItem("token")
        );
        if (response) {
          this.getCities();
        }
      }
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
    async addLocation() {
      if (this.locationValue !== "" && this.selectedCityId !== null) {
        const obj = {
          cityId: this.selectedCityId,
          name: this.locationValue,
          googleMapsLink: "https://maps.googleapis.com/maps/api/geocode/json",
        };
        this.isAddLocationModalOpen = false;
        this.locationValue = "";
        const response = await Location.addLocation(
          obj,
          sessionStorage.getItem("token")
        );
        if (response) {
          this.getLocations();
        }
      }
    },
    async deleteLocation(index) {
      this.locations.splice(index, 1);
    },
  },
};
</script>
