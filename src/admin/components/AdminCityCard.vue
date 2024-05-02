<template>
  <div
    :class="{
      'bg-gray-400': this.selectedCityId === this.id,
      'bg-gray-200 hover:bg-gray-300': this.selectedCityId !== this.id,
    }"
    class="flex w-full justify-between px-5 py-8 border-b border-gray-200 rounded-lg shadow-lg cursor-pointer"
    @click="this.$emit('select-city', this.id)"
  >
    <div>{{ this.nameValue }}</div>
    <div class="cursor-pointer flex gap-2">
      <edit-icon
        class="text-black-600"
        @click.stop="this.isModalOpen = true"
      ></edit-icon>
      <trash-icon
        class="text-red-600"
        @click.stop="this.deleteModal = true"
      ></trash-icon>
    </div>
  </div>
  <custom-modal v-if="this.isModalOpen" @close-modal="this.isModalOpen = false">
    <div class="w-full flex flex-col gap-5">
      <div>Edit city name:</div>
      <div class="flex gap-2 md:flex-row flex-col">
        <div class="flex flex-col w-full">
          <div class="text-sm text-black/40">Country:</div>
          <input
            v-model="this.newCountryValue"
            class="px-4 py-3 rounded-lg outline-none border-2 border-gray-300 w-full"
            placeholder="Country"
            type="text"
          />
        </div>
        <div class="flex flex-col w-full">
          <div class="text-sm text-black/40">City:</div>
          <input
            v-model="this.newNameValue"
            autofocus
            class="px-4 py-3 rounded-lg outline-none border-2 border-gray-300 w-full"
            placeholder="City"
            type="text"
          />
        </div>
      </div>
      <div class="flex justify-end">
        <custom-button :fill="true" @click="updateCity">Save</custom-button>
      </div>
    </div>
  </custom-modal>
  <custom-modal v-if="this.deleteModal" @close-modal="this.deleteModal = false">
    <div class="flex flex-col w-full gap-10">
      <div>Do you want to delete this city?</div>
      <div class="flex w-full justify-between gap-2 sm:flex-row flex-col">
        <custom-button :fill="false" @click="this.deleteModal = false"
          >Cancel
        </custom-button>
        <custom-button
          :fill="true"
          @click="
            this.$emit('delete-city', { id: this.id, index: this.index });
            this.deleteModal = false;
          "
          >Delete
        </custom-button>
      </div>
    </div>
  </custom-modal>
</template>

<script>
import EditIcon from "../../components/icons/EditIcon.vue";
import TrashIcon from "../../components/icons/TrashIcon.vue";
import CustomModal from "../../layouts/CustomModal.vue";
import CustomButton from "../../components/CustomButton.vue";

import City from "../services/city";

export default {
  name: "AdminCityCard",
  props: ["id", "index", "name", "country", "selectedCityId"],
  emits: ["update-city", "delete-city", "select-city"],
  components: {
    EditIcon,
    TrashIcon,
    CustomModal,
    CustomButton,
  },
  data() {
    return {
      isModalOpen: false,
      deleteModal: false,
      nameValue: this.name,
      countryValue: this.country,
      newNameValue: this.name,
      newCountryValue: this.country,
    };
  },
  methods: {
    async updateCity() {
      const object = {
        id: this.id,
        country: this.newCountryValue,
        name: this.newNameValue,
      };

      const response = await City.updateCity(
        object,
        sessionStorage.getItem("token")
      );
      if (response) {
        this.nameValue = this.newNameValue;
        this.countryValue = this.newCountryValue;
        this.isModalOpen = false;
      }
    },
  },
};
</script>
