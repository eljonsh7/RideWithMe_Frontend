<template>
  <div class="flex flex-col w-full p-5 gap-5">
    <div class="flex justify-center text-3xl font-extrabold">Cities</div>
    <div class="flex w-full justify-end">
      <custom-button :fill="true" @click="isAddModalOpen = true"
        >Add city
      </custom-button>
    </div>
    <div class="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-2">
      <admin-city-card
        v-for="(city, index) in cities"
        :id="city.id"
        :key="city.id"
        :country="city.country"
        :index="index"
        :name="city.name"
        @delete-city="deleteCity"
        @update-city="updateCity"
      ></admin-city-card>
    </div>

    <div
      v-if="this.cities.length === 0"
      class="w-full text-black/50 text-sm text-center"
    >
      No cities here!
    </div>
  </div>
  <custom-modal
    v-if="this.isAddModalOpen"
    @close-modal="
      this.isAddModalOpen = false;
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
</template>

<script>
import AdminCityCard from "../components/AdminCityCard.vue";
import CustomButton from "../../components/CustomButton.vue";
import CustomModal from "../../layouts/CustomModal.vue";

import City from "../services/city.js";

export default {
  name: "AdminCitiesPage",
  components: {
    AdminCityCard,
    CustomButton,
    CustomModal,
  },
  data() {
    return {
      isAddModalOpen: false,
      cities: [],
      cityValue: "",
      countryValue: "Kosovë",
    };
  },
  beforeMount() {
    this.getCities();
  },
  methods: {
    async addCity() {
      if (this.cityValue !== "" && this.countryValue !== "") {
        const obj = {
          name: this.cityValue,
          country: this.countryValue,
          token: sessionStorage.getItem("token"),
        };
        this.isAddModalOpen = false;
        this.cityValue = "";
        const response = await City.addCity(obj);
        if (response) {
          this.getCities();
        }
      }
    },
    async getCities() {
      const cities = await City.getCities(sessionStorage.getItem("token"));
      console.log(cities);
      this.cities = cities.data.cities;
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
    async updateCity(object) {
      console.log(object);
      const response = await City.updateCity(
        object,
        sessionStorage.getItem("token")
      );
      if (response) {
        this.cities[object.index].name = object.name;
        this.cities[object.index].country = object.country;
      }
    },
  },
};
</script>
