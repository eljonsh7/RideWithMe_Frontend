<template>
  <CustomModal class="text-left" @close-modal="this.$emit('close-form')">
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
      <CustomInput v-model="this.datetime" type="datetime-local" />
    </div>
    <div>
      <div>Passengers number:</div>
      <CustomInput
        v-model="this.passengersNumber"
        :max="this.maxSeats"
        min="1"
        type="number"
      />
    </div>
    <div>
      <div>Price:</div>
      <CustomInput v-model="this.routePrice" type="text" />
    </div>
    <div class="flex justify-between">
      <CustomButton @click="this.$emit('close-form')">Cancel</CustomButton>
      <CustomButton :fill="true" @click="addRoute">Submit</CustomButton>
    </div>
  </CustomModal>
</template>

<script>
import CustomModal from "../ui/CustomModal.vue";
import CustomButton from "../../components/form/CustomButton.vue";
import CustomInput from "@/components/form/CustomInput.vue";

import Location from "../../services/location.js";
import Route from "../../services/route.js";

import Date from "../../utils/date.js";

export default {
  name: "RouteForm",
  components: { CustomInput, CustomButton, CustomModal },
  props: ["cities", "maxSeats"],
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
        this.$store.getters["users/getToken"]
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
          this.$store.getters["users/getToken"]
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
