<template>
  <CustomModal @close-modal="this.$emit('close-form')">
    <form class="w-full flex flex-col gap-5" @submit.prevent="submit">
      <div>{{ this.car ? "Update" : "Add" }} car:</div>
      <div class="flex gap-2 flex-col">
        <CustomInput
          v-model="this.brand"
          :class="{ 'border-red-500': !this.brand.isValid }"
          autofocus
          placeholder="Car brand"
          required
          type="text"
        />
        <CustomInput
          v-model="this.serie"
          placeholder="Car serie"
          required
          type="text"
        />
        <CustomInput
          v-model="this.type"
          placeholder="Car type"
          required
          type="text"
        />
        <CustomInput
          v-model="this.seats_number"
          max="10"
          min="2"
          placeholder="Number of seats"
          required
          type="number"
        />
        <div class="flex gap-3">
          <div class="w-full aspect-square pt-2">
            <div class="w-full h-full rounded-lg border">
              <img
                :src="imageSource"
                alt="."
                class="w-full h-full object-cover rounded-lg"
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
              <ImageIcon />
              <span>Upload a file here</span>
              <input
                id="fileInput"
                ref="fileInput"
                :required="!this.car"
                accept="image/png, image/jpeg"
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
        <CustomButton :fill="true" class="w-full">Submit</CustomButton>
      </div>
    </form>
  </CustomModal>
</template>

<script>
import CustomModal from "../../layouts/ui/CustomModal.vue";
import CustomButton from "../../components/form/CustomButton.vue";
import CustomInput from "@/components/form/CustomInput.vue";
import ImageIcon from "../../components/icons/ImageIcon.vue";

import Car from "../services/car.js";
import Media from "../../services/media.js";

export default {
  name: "AdminAddCarForm",
  emits: ["close-form"],
  components: { CustomInput, ImageIcon, CustomButton, CustomModal },
  props: ["car"],
  computed: {
    imageSource() {
      return this.thumbnailPath || require("../assets/images/noCarPic.svg");
    },
  },
  watch: {
    seats_number(newValue) {
      if (newValue > 10) this.seats_number = 10;
      if (newValue < 2) this.seats_number = 2;
    },
  },
  data() {
    return {
      brand: this.car ? this.car.brand : "",
      serie: this.car ? this.car.serie : "",
      type: this.car ? this.car.type : "",
      thumbnailPath: this.car
        ? `${process.env.VUE_APP_STORAGE_URL}/${this.car.thumbnail}`
        : null,
      thumbnailFile: null,
      shouldCrop: false,
      seats_number: this.car ? this.car.seats_number : 5,
    };
  },
  methods: {
    submit() {
      if (this.car) this.updateCar();
      else this.addCar();
    },
    async addCar() {
      const thumbnail = await this.getMediaLink(this.thumbnailFile);

      if (!thumbnail) return;

      const carObject = {
        brand: this.brand,
        serie: this.serie,
        type: this.type,
        thumbnail,
        seats_number: this.seats_number,
      };

      const response = await Car.addCar(
        carObject,
        this.$store.getters["users/getToken"]
      );
      if (response) this.$emit("close-form", true);
    },
    async updateCar() {
      const carObject = {
        id: this.car.id,
      };

      if (this.brand !== this.car.brand) carObject.brand = this.brand;
      if (this.serie !== this.car.serie) carObject.serie = this.serie;
      if (this.type !== this.car.type) carObject.type = this.type;
      if (this.seats_number !== this.car.seats_number)
        carObject.seats_number = this.seats_number;

      if (this.thumbnailFile)
        carObject.thumbnail = await this.getMediaLink(this.thumbnailFile);

      const response = await Car.updateCar(
        carObject,
        this.$store.getters["users/getToken"]
      );
      if (response) this.$emit("close-form", response.car);
    },
    async getMediaLink(file) {
      const media = await Media.storeMedia(
        { media: file, folder: "cars" },
        this.$store.getters["users/getToken"]
      );

      return media.file_path;
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
