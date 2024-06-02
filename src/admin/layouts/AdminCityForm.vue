<template>
  <CustomModal @close-modal="this.$emit('close-form')">
    <form class="w-full flex flex-col gap-5" @submit.prevent="submit">
      <div>{{ this.city ? "Update" : "Add" }} city:</div>
      <div class="flex gap-2 md:flex-row flex-col">
        <CustomInput
          v-model="this.countryValue"
          placeholder="Country"
          required
          type="text"
        />
        <CustomInput
          v-model="this.cityValue"
          autofocus
          placeholder="City name"
          required
          type="text"
        />
      </div>
      <div class="flex justify-end">
        <CustomButton :fill="true">Submit</CustomButton>
      </div>
    </form>
  </CustomModal>
</template>

<script>
import CustomButton from "../../components/form/CustomButton.vue";
import CustomModal from "../../layouts/ui/CustomModal.vue";
import CustomInput from "@/components/form/CustomInput.vue";

import City from "../services/city.js";

export default {
  name: "AdminCityForm",
  components: { CustomInput, CustomButton, CustomModal },
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
          this.$store.getters["users/getToken"]
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
        this.$store.getters["users/getToken"]
      );
      if (response) {
        this.$emit("close-form", object);
      }
    },
  },
};
</script>
