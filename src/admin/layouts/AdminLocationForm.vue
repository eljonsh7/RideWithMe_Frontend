<template>
  <CustomModal @close-modal="this.$emit('close-form')">
    <div class="w-full flex flex-col gap-5">
      <div>{{ this.location ? "Update" : "Add" }} location:</div>
      <div class="flex gap-2 md:flex-row flex-col">
        <CustomInput
          v-model="this.locationName"
          autofocus
          placeholder="Location name"
          type="text"
        />
      </div>
      <div class="flex justify-end">
        <CustomButton :fill="true" @click="submit">Submit</CustomButton>
      </div>
    </div>
  </CustomModal>
</template>

<script>
import CustomModal from "../../layouts/CustomModal.vue";
import CustomButton from "../../components/CustomButton.vue";
import CustomInput from "@/components/CustomInput.vue";

import Location from "../services/location.js";

export default {
  name: "AdminLocationForm",
  props: ["selectedCityId", "location"],
  components: { CustomInput, CustomButton, CustomModal },
  data() {
    return {
      locationName: this.location ? this.location.name : "",
    };
  },
  methods: {
    submit() {
      if (this.location) this.updateLocation();
      else this.addLocation();
    },
    async addLocation() {
      if (this.locationName !== "" && this.selectedCityId !== null) {
        const obj = {
          cityId: this.selectedCityId,
          name: this.locationName,
          googleMapsLink: "https://maps.googleapis.com/maps/api/geocode/json",
        };

        const response = await Location.addLocation(
          obj,
          this.$store.getters["users/getToken"]
        );

        if (response) this.$emit("close-form", true);
      }
    },
    async updateLocation() {
      const obj = {
        name: this.locationName,
        locationId: this.location.id,
        googleMapsLink: "https://maps.googleapis.com/maps/api/geocode/json",
      };

      const response = await Location.updateLocation(
        obj,
        this.$store.getters["users/getToken"]
      );

      if (response) this.$emit("close-form", obj);
    },
  },
};
</script>
