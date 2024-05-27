<template>
  <CustomModal
    class="flex flex-col gap-2 p-4 sm:p-0"
    @close-modal="this.$emit('close-form')"
  >
    <div>Select your car first:</div>
    <div>
      <Swiper
        :modules="modules"
        :slides-per-view="2"
        :space-between="10"
        class="h-auto"
        @slideChange="onSlideChange"
        @swiper="onSwiper"
      >
        <SwiperSlide
          v-for="car in cars"
          :key="car.id"
          :class="{
            'border-black': this.selectedCarId === car.id,
            'border-transparent': this.selectedCarId !== car.id,
          }"
          class="border-2 rounded-lg cursor-pointer bg-black/10 flex flex-col"
          @click="this.selectedCarId = car.id"
        >
          <img
            :src="`${storageLink}/${car.thumbnail}`"
            alt=""
            class="h-full aspect-square rounded-t-lg object-cover"
          />
          <div class="text-xs p-1">
            {{ `${car.brand}: ${car.serie} ${car.type}` }}
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
    <div v-if="this.selectedCarId" class="flex gap-1">
      <div class="flex flex-col gap-1 w-full">
        <div class="w-full text-left">
          <div class="text-sm text-black/50">Color:</div>
          <CustomInput v-model="color" placeholder="Color" type="text" />
        </div>
        <div class="w-full text-left">
          <div class="text-sm text-black/50">Year:</div>
          <CustomInput v-model="year" placeholder="Year" type="number" />
        </div>
      </div>
      <div v-if="carImage" class="w-full">
        <img
          :src="this.carImage"
          alt=""
          class="rounded-lg border border-black"
        />
      </div>
    </div>
    <div class="flex justify-between">
      <input
        id="carImage"
        ref="carImage"
        accept="image/png, image/jpeg"
        hidden
        name="carImage"
        type="file"
        @change="showSelectedImage"
      />
      <label
        v-if="selectedCarId"
        class="w-auto border border-black rounded-lg p-2 cursor-pointer"
        for="carImage"
        >Input photo</label
      >
      <CustomButton :fill="true" @click="selectCar">Save</CustomButton>
    </div>
  </CustomModal>
</template>

<script>
import CustomModal from "@/layouts/CustomModal.vue";
import Car from "../../services/car.js";
import Media from "../../services/media.js";
import CustomButton from "@/components/CustomButton.vue";

import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import Toast from "../../utils/toast.js";
import CustomInput from "@/components/CustomInput.vue";

export default {
  name: "SelectCarForm",
  props: ["car"],
  components: {
    CustomInput,
    CustomButton,
    CustomModal,
    Swiper,
    SwiperSlide,
  },
  emits: ["close-form"],
  data() {
    return {
      selectedCarId: this.car ? this.car.car_id : null,
      cars: [],
      storageLink: process.env.VUE_APP_STORAGE_URL,
      color: this.car ? this.car.color : null,
      year: this.car ? this.car.year : null,
      carImageFile: null,
      carImage: this.car
        ? `${process.env.VUE_APP_STORAGE_URL}/${this.car.thumbnail}`
        : null,
    };
  },
  beforeMount() {
    this.getCars();
  },
  methods: {
    async getCars() {
      const response = await Car.getCars(this.$store.getters["users/getToken"]);
      console.log(response);
      this.cars = response.cars;
    },
    async selectCar() {
      if (!this.selectedCarId) {
        Toast.showWarning("You should choose what car you have.");
        return;
      }

      if (!this.year || !this.color) {
        Toast.showWarning("Please fill out all fields.");
        return;
      }

      if (this.car) {
        this.updateAttachedCar();
        return;
      }

      if (!this.carImageFile) {
        Toast.showWarning("You should put an image of your car.");
        return;
      }

      const thumbnail = await this.getMediaLink();

      const object = {
        car_id: this.selectedCarId,
        color: this.color,
        year: this.year,
        thumbnail,
      };

      const response = Car.attachCar(
        object,
        this.$store.getters["users/getToken"]
      );
      if (response) {
        Toast.showSuccess("Car attached successfully.");
        this.$emit("close-form", true);
      }
    },
    async getMediaLink() {
      const media = await Media.storeMedia(
        { media: this.carImageFile, folder: "userCars" },
        this.$store.getters["users/getToken"]
      );

      return media.file_path;
    },
    showSelectedImage() {
      this.carImageFile = this.$refs.carImage.files[0];
      this.carImage = this.carImageFile;
      const reader = new FileReader();
      reader.onload = (e) => {
        this.carImage = e.target.result;
      };
      reader.readAsDataURL(this.carImageFile);
    },
    async updateAttachedCar() {
      const object = {};
      if (this.carImageFile) object.thumbnail = await this.getMediaLink();
      if (this.selectedCarId !== this.car.id)
        object.car_id = this.selectedCarId;
      if (this.color !== this.car.color) object.color = this.color;
      if (this.year !== this.car.year) object.year = this.year;

      const response = Car.updateAttachedCar(
        object,
        this.$store.getters["users/getToken"]
      );
      if (response) {
        Toast.showSuccess("Car updated successfully.");
        this.$emit("close-form", true);
      }
    },
  },
};
</script>
