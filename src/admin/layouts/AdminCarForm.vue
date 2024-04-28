<template>
  <custom-modal @close-modal="this.$emit('close-modal')">
    <div class="w-full flex flex-col gap-5">
      <div>Add car:</div>
      <div class="flex gap-2 flex-col">
        <input
          v-model="this.brand.value"
          autofocus
          class="px-4 py-3 rounded-lg outline-none border-2 border-gray-300 w-full"
          placeholder="Car brand"
          type="text"
        />
        <input
          v-model="this.serie.value"
          class="px-4 py-3 rounded-lg outline-none border-2 border-gray-300 w-full"
          placeholder="Car serie"
          type="text"
        />
        <input
          v-model="this.type.value"
          class="px-4 py-3 rounded-lg outline-none border-2 border-gray-300 w-full"
          placeholder="Car type"
          type="text"
        />
        <input
          v-model="this.seats_number.value"
          class="px-4 py-3 rounded-lg outline-none border-2 border-gray-300 w-full"
          placeholder="Number of seats"
          type="number"
        />
        <div
          accept="image/png, image/jpeg"
          class="px-4 py-3 rounded-lg outline-none border-2 border-gray-300 w-full cursor-pointer"
          placeholder="Number of seats"
          type="file"
          @click="this.$refs.fileInput.click"
        >
          Choose thumbnail image
        </div>
      </div>
      <div class="flex justify-end">
        <custom-button :fill="true" class="w-full" @click="submit"
          >Submit
        </custom-button>
      </div>
    </div>
  </custom-modal>
  <input
    ref="fileInput"
    accept="image/png, image/jpeg"
    class="hidden"
    type="file"
  />
</template>

<script>
import CustomModal from "../../layouts/CustomModal.vue";
import CustomButton from "../../components/CustomButton.vue";

import Car from "../services/car";

export default {
  name: "AdminAddCarForm",
  emits: ["close-modal"],
  components: { CustomButton, CustomModal },
  props: ["car"],
  data() {
    return {
      formIsValid: true,
      brand: { value: this.car.brand || "", isValid: true },
      serie: { value: this.car.serie || "", isValid: true },
      type: { value: this.car.type || "", isValid: true },
      thumbnailPath: this.car.thumbnailPath,
      thumbnailFile: null,
      seats_number: { value: this.car.seats_number || 5, isValid: true },
    };
  },
  methods: {
    async submit() {
      await this.resetValidity();

      await this.checkValidity();
      if (!this.formIsValid) return;

      if (this.car) await this.updateCar();
      else await this.addCar();
    },
    async addCar() {
      const carObject = {
        brand: this.brand.value,
        serie: this.serie.value,
        type: this.car.type,
        thumbnail: this.$refs.fileInput.files[0],
        seats_number: this.car.seats_number,
      };

      const response = await Car.addCar(
        carObject,
        sessionStorage.getItem("token")
      );
      if (response) this.$emit("close-modal", response);
    },
    async updateCar() {
      const carObject = {
        brand: this.brand.value,
        serie: this.serie.value,
        type: this.car.type,
        thumbnail: this.$refs.fileInput.files[0],
        seats_number: this.car.seats_number,
      };

      const response = await Car.updateCar(
        carObject,
        sessionStorage.getItem("token")
      );
      if (response) this.$emit("close-modal", response);
    },
    async checkValidity() {
      if (this.brand.value === "") {
        this.brand.isValid = false;
        this.formIsValid = false;
      }

      if (this.serie.value === "") {
        this.serie.isValid = false;
        this.formIsValid = false;
      }

      if (this.type.value === "") {
        this.type.isValid = false;
        this.formIsValid = false;
      }

      if (this.seats_number.value === "" || this.seats_number.value === 0) {
        this.seats_number.isValid = false;
        this.formIsValid = false;
      }
    },
    async resetValidity() {
      this.formIsValid = true;
      this.brand.isValid = true;
      this.serie.isValid = true;
      this.type.isValid = true;
      this.seats_number.isValid = true;
    },
  },
};
</script>
