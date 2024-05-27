<template>
  <div class="w-full text-center p-5 flex flex-col gap-3">
    <div class="flex justify-center text-3xl font-extrabold">Cities</div>
    <div class="w-full justify-end flex">
      <CustomButton :fill="true" @click="isAddCarModalOpen = true"
        >Add car
      </CustomButton>
    </div>
    <div v-if="this.cars.length > 0" class="grid grid-cols-3 gap-3">
      <AdminCarCard
        v-for="(car, index) in cars"
        :id="car.id"
        :key="car.id"
        :carObject="car"
        :index="index"
        @car-deleted="this.removeCar"
      />
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
  <AdminCarForm
    v-if="this.isAddCarModalOpen"
    :car="null"
    @close-form="closeForm"
  />
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
    if (
      !this.$store.getters["users/getUser"] ||
      this.$store.getters["users/getUser"].is_admin === 0
    )
      this.$router.push("/");
    else this.getCars();
  },
  data() {
    return {
      cars: [],
      isAddCarModalOpen: false,
    };
  },
  methods: {
    closeForm(value) {
      this.isAddCarModalOpen = false;
      if (value) this.getCars();
    },
    async getCars() {
      const response = await Car.getCars(this.$store.getters["users/getToken"]);
      if (response) this.cars = response.cars;
    },
    removeCar(index) {
      this.cars.splice(index, 1);
    },
  },
};
</script>
