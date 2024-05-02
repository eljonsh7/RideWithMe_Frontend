<template>
  <custom-modal @close-modal="this.$emit('close-form')">
    <div class="w-full flex flex-col gap-5">
      <div>Add city:</div>
      <div class="flex gap-2 md:flex-row flex-col">
        <input
          v-model="this.location"
          autofocus
          class="px-4 py-3 rounded-lg outline-none border-2 border-gray-300 w-full"
          placeholder="Location name"
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
import CustomModal from "../../layouts/CustomModal.vue";
import CustomButton from "../../components/CustomButton.vue";

import Location from "../services/location.js";

export default {
  name: "AdminLocationForm",
  props: ["selectedCityId"],
  components: { CustomButton, CustomModal },
  data() {
    return {
      location: "",
    };
  },
  methods: {
    async addLocation() {
      if (this.location !== "" && this.selectedCityId !== null) {
        const obj = {
          cityId: this.selectedCityId,
          name: this.location,
          googleMapsLink: "https://maps.googleapis.com/maps/api/geocode/json",
        };

        const response = await Location.addLocation(
          obj,
          sessionStorage.getItem("token")
        );

        if (response) this.$emit("close-form", true);
      }
    },
  },
};
</script>
