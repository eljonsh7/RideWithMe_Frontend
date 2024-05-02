<template>
  <div class="w-full text-center p-5 flex flex-col gap-3">
    <div class="flex justify-center text-3xl font-extrabold">Cities</div>
    <div class="w-full justify-end flex">
      <custom-button :fill="true" @click="isAddCarModalOpen = true"
        >Add car
      </custom-button>
    </div>
    <div v-if="this.cars.length > 0" class="grid grid-cols-3 gap-3">
      <admin-car-card
        v-for="(car, index) in cars"
        :id="car.id"
        :key="car.id"
        :carObject="car"
        :index="index"
        @car-deleted="this.removeCar"
      >
      </admin-car-card>
    </div>
    <div
      v-else
      class="w-full text-center text-sm text-black/50 font-bold flex items-center gap-3"
    >
      <hr class="w-full" />
      <div class="w-max text-nowrap">No cars registered</div>
      <hr class="w-full" />
    </div>
  </div>
  <admin-car-form
    v-if="this.isAddCarModalOpen"
    :car="null"
    @close-form="closeForm"
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
    removeCar(index) {
      this.cars.splice(index, 1);
    },
  },
};
</script>
