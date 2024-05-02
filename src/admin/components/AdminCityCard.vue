<template>
  <div
    :class="{
      'bg-gray-400': this.selectedCityId === this.city.id,
      'bg-gray-200 hover:bg-gray-300': this.selectedCityId !== this.city.id,
    }"
    class="flex w-full justify-between px-5 py-8 border-b border-gray-200 rounded-lg shadow-lg cursor-pointer"
    @click="this.$emit('select-city', this.city.id)"
  >
    <div>{{ this.nameValue }}</div>
    <div class="cursor-pointer flex gap-2">
      <edit-icon
        class="text-black-600"
        @click.stop="this.isUpdateModalOpen = true"
      ></edit-icon>
      <trash-icon
        class="text-red-600"
        @click.stop="this.deleteModal = true"
      ></trash-icon>
    </div>
  </div>
  <admin-city-form
    v-if="this.isUpdateModalOpen"
    :city="this.city"
    @close-form="updateCity"
  />
  <confirm-box
    v-if="this.deleteModal"
    @close-modal="this.deleteModal = false"
    @confirm-action="deleteCity"
    >Are you sure you want to delete location: '{{ this.city.name }}'?
  </confirm-box>
</template>

<script>
import EditIcon from "../../components/icons/EditIcon.vue";
import TrashIcon from "../../components/icons/TrashIcon.vue";
import AdminCityForm from "../layouts/AdminCityForm.vue";
import ConfirmBox from "../../layouts/ConfirmBox.vue";

import City from "../services/city.js";

export default {
  name: "AdminCityCard",
  props: ["index", "city", "selectedCityId"],
  emits: ["delete-city", "select-city"],
  components: {
    ConfirmBox,
    AdminCityForm,
    EditIcon,
    TrashIcon,
  },
  data() {
    return {
      isUpdateModalOpen: false,
      deleteModal: false,
      nameValue: this.city.name,
      countryValue: this.city.country,
      newNameValue: this.city.name,
      newCountryValue: this.country,
    };
  },
  methods: {
    async updateCity(object) {
      if (object) {
        this.nameValue = object.name;
        this.countryValue = object.country;
      }
      this.isUpdateModalOpen = false;
    },
    async deleteCity() {
      const response = await City.deleteCity(
        this.city.id,
        sessionStorage.getItem("token")
      );
      if (response) {
        this.isUpdateModalOpen = false;
        this.$emit("delete-city", this.index);
      }
    },
  },
};
</script>
