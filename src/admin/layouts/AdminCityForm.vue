<template>
  <custom-modal @close-modal="this.$emit('close-form')">
    <div class="w-full flex flex-col gap-5">
      <div>{{ this.city ? "Update" : "Add" }} city:</div>
      <div class="flex gap-2 md:flex-row flex-col">
        <input
          v-model="this.countryValue"
          class="px-4 py-3 rounded-lg outline-none border-2 border-gray-300 w-full"
          placeholder="Country"
          type="text"
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
        <custom-button :fill="true" @click="submit">Submit</custom-button>
      </div>
    </div>
  </custom-modal>
</template>

<script>
import CustomButton from "../../components/CustomButton.vue";
import CustomModal from "../../layouts/CustomModal.vue";

import City from "../services/city.js";

export default {
  name: "AdminCityForm",
  components: { CustomButton, CustomModal },
  props: ["city"],
  emits: ["close-form"],
  data() {
    return {
      cityValue: this.city ? this.city.name : "",
      countryValue: "Kosovë",
    };
  },
  methods: {
    submit() {
      if (this.city) this.updateCity();
      else this.addCity();
    },
    async addCity() {
      if (this.cityValue !== "" && this.countryValue !== "") {
        const obj = {
          name: this.cityValue,
          country: this.countryValue,
        };

        const response = await City.addCity(
          obj,
          sessionStorage.getItem("token")
        );

        if (response) this.$emit("close-form", true);
      }
    },
    async updateCity() {
      const object = {
        id: this.city.id,
        country: this.countryValue,
        name: this.cityValue,
      };

      const response = await City.updateCity(
        object,
        sessionStorage.getItem("token")
      );
      if (response) {
        this.$emit("close-form", object);
      }
    },
  },
};
</script>
