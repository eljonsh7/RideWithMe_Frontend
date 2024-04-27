<template>
  <div
    class="flex w-full justify-between px-5 py-8 bg-gray-200 hover:bg-gray-300 border-b border-gray-200 rounded-lg shadow-lg cursor-pointer"
    @click="this.$emit('select-location', this.id)"
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
      <div>Edit location name:</div>
      <div class="flex gap-2 md:flex-row flex-col">
        <div class="flex flex-col w-full">
          <div class="text-sm text-black/40">Location:</div>
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
        <custom-button :fill="true" @click="updateLocation">Save</custom-button>
      </div>
    </div>
  </custom-modal>
  <custom-modal v-if="this.deleteModal" @close-modal="this.deleteModal = false">
    <div class="flex flex-col gap-10">
      <div>Do you want to delete this city?</div>
      <div class="flex w-full justify-between gap-2 sm:flex-row flex-col">
        <custom-button :fill="false" @click="this.deleteModal = false"
          >Cancel
        </custom-button>
        <custom-button :fill="true" @click="deleteLocation"
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

import Location from "../services/location.js";

export default {
  name: "AdminLocationCard",
  props: ["id", "index", "name", "cityId"],
  emits: ["delete-location"],
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
      newNameValue: this.name,
    };
  },
  methods: {
    async deleteLocation() {
      const response = await Location.deleteLocation(
        this.id,
        sessionStorage.getItem("token")
      );
      if (response) {
        this.isModalOpen = false;
        this.$emit("delete-location", this.index);
      }
    },
    updateLocation() {
      const object = {
        locationId: this.id,
        name: this.nameValue,
      };

      const response = Location.updateLocation(
        object,
        sessionStorage.getItem("token")
      );
      if (response) {
        this.nameValue = this.newNameValue;
        this.isModalOpen = false;
      }
    },
  },
};
</script>
