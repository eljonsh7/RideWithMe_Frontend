<template>
  <div class="w-full text-center p-4 flex flex-col">
    <div class="flex justify-center text-3xl font-extrabold">Cities</div>
    <div class="w-full justify-end flex">
      <custom-button :fill="true" @click="isAddCarModalOpen = true"
        >Add car
      </custom-button>
    </div>
    <admin-car-card v-for="car in cars" :id="car.id" :key="car.id" :car="car">
    </admin-car-card>
  </div>
  <admin-car-form
    v-if="this.isAddCarModalOpen"
    :car="{}"
    @close-modal="closeForm"
  ></admin-car-form>
</template>

<script>
import AdminCarCard from "../components/AdminCarCard.vue";
import CustomButton from "../../components/CustomButton.vue";
import AdminCarForm from "@/admin/layouts/AdminCarForm.vue";

import Car from "../services/car.js";

export default {
  name: "AdminCarsPage",
  components: { AdminCarForm, CustomButton, AdminCarCard },
  beforeMount() {
    this.getCars();
  },
  data() {
    return {
      cars: [],
      isAddCarModalOpen: false,
    };
  },
  methods: {
    closeForm(arg) {
      this.isAddCarModalOpen = false;
      console.log(arg);
      this.getCars();
    },
    async getCars() {
      const response = await Car.getCars(sessionStorage.getItem("token"));
      if (response) this.cars = response.data.cars;
    },
  },
};
</script>
