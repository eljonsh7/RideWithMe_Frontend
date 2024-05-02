<template>
  <custom-modal @close-modal="this.$emit('close-form')">
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
        <div class="flex gap-3">
          <div class="w-full aspect-square p-2">
            <div class="w-full h-full rounded-lg border">
              <img
                :src="imageSource"
                alt="."
                class="w-full h-full object-cover"
              />
            </div>
          </div>
          <label
            class="w-full mt-2 flex justify-center rounded-lg border-2 border-dashed border-gray-900/25 py-5 cursor-pointer"
            for="fileInput"
          >
            <span
              class="flex flex-col justify-center text-sm leading-6 text-gray-600"
            >
              <image-icon></image-icon>
              <span>Upload a file here</span>
              <input
                id="fileInput"
                ref="fileInput"
                class="sr-only"
                name="fileInput"
                type="file"
                @change="showImage"
              />
            </span>
          </label>
        </div>
      </div>
      <div class="flex justify-end">
        <custom-button :fill="true" class="w-full" @click="submit"
          >Submit
        </custom-button>
      </div>
    </div>
  </custom-modal>
</template>

<script>
import CustomModal from "../../layouts/CustomModal.vue";
import CustomButton from "../../components/CustomButton.vue";
import ImageIcon from "../../components/icons/ImageIcon.vue";

import Car from "../services/car.js";
import Media from "../services/media.js";

export default {
  name: "AdminAddCarForm",
  emits: ["close-form"],
  components: { ImageIcon, CustomButton, CustomModal },
  props: ["car"],
  computed: {
    imageSource() {
      return this.thumbnailPath || require("../assets/images/noCarPic.svg");
    },
  },
  data() {
    return {
      formIsValid: true,
      brand: { value: this.car ? this.car.brand : "", isValid: true },
      serie: { value: this.car ? this.car.serie : "", isValid: true },
      type: { value: this.car ? this.car.type : "", isValid: true },
      thumbnailPath: this.car
        ? `http://127.0.0.1:8000/storage/${this.car.thumbnail}`
        : null,
      thumbnailFile: null,
      shouldCrop: false,
      seats_number: {
        value: this.car ? this.car.seats_number : 5,
        isValid: true,
      },
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
      const thumbnail = await this.getMediaLink(this.thumbnailFile);

      const carObject = {
        brand: this.brand.value,
        serie: this.serie.value,
        type: this.type.value,
        thumbnail,
        seats_number: this.seats_number.value,
      };

      console.log(carObject);
      const response = await Car.addCar(
        carObject,
        sessionStorage.getItem("token")
      );
      if (response) this.$emit("close-form", response);
    },
    async updateCar() {
      const carObject = {
        id: this.car.id,
      };

      if (this.brand.value !== this.car.brand)
        carObject.brand = this.brand.value;
      if (this.serie.value !== this.car.serie)
        carObject.serie = this.serie.value;
      if (this.type.value !== this.car.type) carObject.type = this.type.value;
      if (this.seats_number.value !== this.car.seats_number)
        carObject.seats_number = this.seats_number.value;

      if (this.thumbnailFile) {
        carObject.thumbnail = await this.getMediaLink(this.thumbnailFile);
      }

      const response = await Car.updateCar(
        carObject,
        sessionStorage.getItem("token")
      );
      if (response) this.$emit("close-form", carObject);
    },
    async getMediaLink(file) {
      const media = await Media.storeMedia(
        { media: file },
        sessionStorage.getItem("token")
      );

      return media.data.file_path;
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
    showImage() {
      this.thumbnailFile = this.$refs.fileInput.files[0];
      this.thumbnailPath = this.thumbnailFile;
      const reader = new FileReader();
      reader.onload = (e) => {
        this.thumbnailPath = e.target.result;
      };
      reader.readAsDataURL(this.thumbnailFile);
    },
  },
};
</script>
