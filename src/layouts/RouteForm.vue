<template>
  <custom-modal class="text-left" @close-modal="this.$emit('close-form')">
    <div>
      <div>Going from:</div>
      <select
        id="toRoute"
        v-model="this.fromCity"
        class="w-full border border-gray-500 p-2 rounded-lg bg-white text-black text-center"
      >
        <option
          v-for="city in this.filteredCities('from')"
          :key="city.id"
          :value="city.id"
        >
          {{ city.name }}
        </option>
      </select>
    </div>
    <div>
      <div>Going to:</div>
      <select
        id="toRoute"
        v-model="this.toCity"
        class="w-full border border-gray-500 p-2 rounded-lg bg-white text-black text-center"
      >
        <option
          v-for="city in this.filteredCities('to')"
          :key="city.id"
          :value="city.id"
        >
          {{ city.name }}
        </option>
      </select>
    </div>
    <div>
      <div>Meeting location:</div>
      <select
        id="toRoute"
        v-model="this.location"
        class="w-full border border-gray-500 p-2 rounded-lg bg-white text-black text-center"
      >
        <option v-for="city in this.locations" :key="city.id" :value="city.id">
          {{ city.name }}
        </option>
      </select>
    </div>
    <div>
      <div>Date and time:</div>
      <input
        v-model="this.datetime"
        class="w-full border border-gray-500 p-2 rounded-lg bg-white text-black text-center"
        type="datetime-local"
      />
    </div>
    <div>
      <div>Passengers number:</div>
      <input
        v-model="this.passengersNumber"
        class="w-full border border-gray-500 p-2 rounded-lg bg-white text-black text-center"
        type="number"
      />
    </div>
    <div>
      <div>Price:</div>
      <input
        v-model="this.routePrice"
        class="w-full border border-gray-500 p-2 rounded-lg bg-white text-black text-center"
        type="text"
      />
    </div>
    <div class="flex justify-between">
      <custom-button @click="this.$emit('close-form')">Cancel</custom-button>
      <custom-button :fill="true" @click="addRoute">Submit</custom-button>
    </div>
  </custom-modal>
</template>

<script>
import CustomModal from "./CustomModal.vue";
import CustomButton from "../components/CustomButton.vue";

import Location from "../services/location.js";
import Route from "../services/route.js";

import Date from "../utils/date.js";

export default {
  name: "RouteForm",
  components: { CustomButton, CustomModal },
  props: ["cities"],
  emits: ["close-form"],
  watch: {
    fromCity(newValue) {
      this.fromCityId = newValue;
      this.getLocations();
    },
  },
  data() {
    return {
      fromCity: "",
      toCity: "",
      location: "",
      locations: [],
      passengersNumber: 4,
      datetime: null,
      routePrice: 1.5,
      fromCityId: "",
    };
  },
  methods: {
    async getLocations() {
      const locations = await Location.getLocations(
        this.fromCityId,
        sessionStorage.getItem("token")
      );
      if (locations) this.locations = locations.locations;
    },
    filteredCities(a) {
      if (a === "from") {
        return this.cities.filter((item) => {
          return item.id !== this.toCity;
        });
      } else {
        return this.cities.filter((item) => {
          return item.id !== this.fromCity;
        });
      }
    },
    addRoute() {
      if (
        this.fromCity &&
        this.toCity &&
        this.datetime &&
        this.location &&
        this.passengersNumber &&
        this.routePrice
      ) {
        const object = {
          driver_id: this.$store.getters["users/getUser"].id,
          city_from_id: this.fromCityId,
          city_to_id: this.toCity,
          location_id: this.location,
          datetime: Date.formatDateTime(this.datetime),
          passengers_number: this.passengersNumber,
          price: this.routePrice,
        };
        const response = Route.addRoute(
          object,
          sessionStorage.getItem("token")
        );

        if (response) this.$emit("close-form", true);
      } else {
        console.log(
          this.fromCity,
          this.toCity,
          this.datetime,
          this.location,
          this.passengersNumber
        );
      }
    },
  },
};
</script>
