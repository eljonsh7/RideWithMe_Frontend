<template>
  <div
    class="flex flex-col w-full justify-between border-b border-gray-200 rounded-lg shadow-lg cursor-pointer hover:shadow-2xl"
  >
    <div class="w-full h-52">
      <img
        v-if="this.car.thumbnail"
        :src="`${storageLink}/${this.car.thumbnail}`"
        alt="."
        class="w-full h-full object-cover rounded-t-lg"
      />
      <ImageIcon v-else class="w-full h-full object-cover rounded-t-lg" />
    </div>
    <div class="p-2">
      {{ this.fullCarName }}
    </div>
    <div class="flex justify-between items-center">
      <div class="text-xs text-black/70 font-bold pl-4">
        Seats: {{ this.car.seats_number }}
      </div>
      <div class="flex justify-end gap-2 p-2">
        <EditIcon @click="this.updateCarModal = true" />
        <TrashIcon @click="this.deleteCarModal = true" />
      </div>
    </div>
  </div>
  <ConfirmBox
    v-if="this.deleteCarModal"
    @close-modal="this.deleteCarModal = false"
    @confirm-action="this.deleteCar"
    >Are you sure you want to delete car: {{ this.fullCarName }}
  </ConfirmBox>
  <AdminCarForm
    v-if="this.updateCarModal"
    :car="this.car"
    @close-form="closeForm"
  />
</template>

<script>
import ImageIcon from "../../components/icons/ImageIcon.vue";
import ConfirmBox from "../../layouts/ui/ConfirmBox.vue";

import Car from "../services/car.js";
import EditIcon from "../../components/icons/EditIcon.vue";
import TrashIcon from "../../components/icons/TrashIcon.vue";
import AdminCarForm from "../layouts/AdminCarForm.vue";

export default {
  name: "AdminCarCard",
  props: ["id", "carObject", "index"],
  emits: ["car-deleted"],
  components: { AdminCarForm, TrashIcon, EditIcon, ConfirmBox, ImageIcon },
  data() {
    return {
      deleteCarModal: false,
      updateCarModal: false,
      car: this.carObject,
      storageLink: process.env.VUE_APP_STORAGE_URL,
    };
  },
  computed: {
    fullCarName() {
      return `${this.car.brand}: ${this.car.serie} ${this.car.type}`;
    },
  },
  methods: {
    async deleteCar() {
      const response = await Car.deleteCar(
        this.id,
        this.$store.getters["users/getToken"]
      );
      if (response) this.$emit("car-deleted", this.index);
    },
    closeForm(arg) {
      if (arg) {
        if (arg.brand) this.car.brand = arg.brand;
        if (arg.serie) this.car.serie = arg.serie;
        if (arg.type) this.car.type = arg.type;
        if (arg.thumbnail) this.car.thumbnail = arg.thumbnail;
        if (arg.seats_number) this.car.seats_number = arg.seats_number;
      }
      this.updateCarModal = false;
    },
  },
};
</script>
