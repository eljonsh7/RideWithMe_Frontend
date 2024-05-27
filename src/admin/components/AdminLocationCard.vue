<template>
  <div
    class="flex w-full justify-between px-5 py-8 bg-gray-200 hover:bg-gray-300 border-b border-gray-200 rounded-lg shadow-lg cursor-pointer"
  >
    <div>{{ this.nameValue }}</div>
    <div class="cursor-pointer flex gap-2">
      <EditIcon
        class="text-black-600"
        @click.stop="this.isUpdateModalOpen = true"
      />
      <TrashIcon class="text-red-600" @click.stop="this.deleteModal = true" />
    </div>
  </div>
  <AdminLocationForm
    v-if="this.isUpdateModalOpen"
    :location="this.location"
    @close-form="updateLocation"
  />
  <ConfirmBox
    v-if="this.deleteModal"
    @close-modal="this.deleteModal = false"
    @confirm-action="deleteLocation"
    >Are you sure you want to delete location: '{{ this.location.name }}'?
  </ConfirmBox>
</template>

<script>
import EditIcon from "../../components/icons/EditIcon.vue";
import TrashIcon from "../../components/icons/TrashIcon.vue";
import AdminLocationForm from "../layouts/AdminLocationForm.vue";
import ConfirmBox from "../../layouts/ConfirmBox.vue";

import Location from "../services/location.js";

export default {
  name: "AdminLocationCard",
  props: ["location", "index", "cityId"],
  emits: ["delete-location"],
  components: {
    ConfirmBox,
    AdminLocationForm,
    EditIcon,
    TrashIcon,
  },
  data() {
    return {
      isUpdateModalOpen: false,
      deleteModal: false,
      nameValue: this.location.name,
      newNameValue: this.location.name,
    };
  },
  methods: {
    async deleteLocation() {
      const response = await Location.deleteLocation(
        this.location.id,
        this.$store.getters["users/getToken"]
      );
      if (response) {
        this.isUpdateModalOpen = false;
        this.$emit("delete-location", this.index);
      }
    },
    updateLocation(a) {
      if (a) this.nameValue = a.name;
      this.isUpdateModalOpen = false;
    },
  },
};
</script>
