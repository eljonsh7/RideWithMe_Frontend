<template>
  <custom-modal @close-modal="this.$emit('close-form')">
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
import CustomButton from "../../components/CustomButton.vue";
import CustomModal from "../../layouts/CustomModal.vue";

import City from "../services/city.js";

export default {
  name: "AdminCityForm",
  components: { CustomButton, CustomModal },
  emits: ["close-form"],
  data() {
    return {
      cityValue: "",
      countryValue: "Kosovë",
    };
  },
  methods: {
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
  },
};
</script>
