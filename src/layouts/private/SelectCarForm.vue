<template>
  <custom-modal
    class="flex flex-col gap-2 p-4 sm:p-0"
    @close-modal="this.$emit('close-form')"
  >
    <div>Select your car first:</div>
    <div>
      <swiper
        :modules="modules"
        :slides-per-view="2"
        :space-between="10"
        class="h-auto"
        @slideChange="onSlideChange"
        @swiper="onSwiper"
      >
        <swiper-slide
          v-for="car in cars"
          :key="car.id"
          :class="{
            'border-black': this.selectedCar === car,
            'border-transparent': this.selectedCar !== car,
          }"
          class="border-2 rounded-lg cursor-pointer bg-black/10 flex flex-col"
          @click="this.selectedCar = car"
        >
          <img
            :src="`${storageLink}/${car.thumbnail}`"
            alt=""
            class="h-full aspect-square rounded-t-lg object-cover"
          />
          <div class="text-xs p-1">
            {{ `${car.brand}: ${car.serie} ${car.type}` }}
          </div>
        </swiper-slide>
      </swiper>
    </div>
    <div v-if="this.selectedCar" class="flex gap-1">
      <div class="flex flex-col gap-1 w-full">
        <input
          v-model="color"
          class="w-full rounded-lg py-2 px-3 border border-gray-300 outline-none"
          placeholder="Color"
          type="text"
        />
        <input
          v-model="year"
          class="w-full rounded-lg py-2 px-3 border border-gray-300 outline-none"
          placeholder="Year"
          type="number"
        />
      </div>
      <div v-if="carImage" class="w-full">
        <img :src="this.carImage" alt="" class="rounded-lg" />
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
        v-if="selectedCar"
        class="w-auto border border-black rounded-lg p-2 cursor-pointer"
        for="carImage"
        >Input photo</label
      >
      <custom-button :fill="true" @click="selectCar">Save</custom-button>
    </div>
  </custom-modal>
</template>

<script>
import CustomModal from "@/layouts/CustomModal.vue";
import Car from "../../services/car.js";
import Media from "../../services/media.js";
import CustomButton from "@/components/CustomButton.vue";

// Import Swiper styles
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import Toast from "../../utils/toast.js";

export default {
  name: "SelectCarForm",
  components: {
    CustomButton,
    CustomModal,
    Swiper,
    SwiperSlide,
  },
  emits: ["close-form"],
  data() {
    return {
      selectedCar: null,
      cars: [],
      storageLink: process.env.VUE_APP_STORAGE_URL,
      color: null,
      year: null,
      carImageFile: null,
      carImage: null,
    };
  },
  beforeMount() {
    this.getCars();
  },
  methods: {
    async getCars() {
      const response = await Car.getCars(sessionStorage.getItem("token"));
      console.log(response);
      this.cars = response.cars;
    },
    async selectCar() {
      if (!this.selectedCar) {
        Toast.showWarning("You should choose what car you have.");
        return;
      }

      if (!this.year || !this.color) {
        Toast.showWarning("Please fill out all fields.");
        return;
      }

      if (!this.carImageFile) {
        Toast.showWarning("You should put an image of your car.");
        return;
      }

      const thumbnail = await this.getMediaLink();

      const object = {
        car_id: this.selectedCar.id,
        color: this.color,
        year: this.year,
        thumbnail,
      };

      const response = Car.attachCar(object, sessionStorage.getItem("token"));
      if (response) {
        Toast.showSuccess("Car attached successfully.");
        this.$emit("close-form");
      }
    },
    async getMediaLink() {
      const media = await Media.storeMedia(
        { media: this.carImageFile },
        sessionStorage.getItem("token")
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
  },
};
</script>
