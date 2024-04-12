<template>
  <div
    class="flex w-full justify-between px-5 py-8 border-b border-gray-200 bg-gray-200 hover:bg-gray-300 rounded-lg shadow-lg cursor-pointer"
    @click="
      this.isModalOpen = true;
      this.cityValue = this.name;
      this.countryValue = 'Kosova';
    "
  >
    <div>{{ name }}</div>
    <div class="cursor-pointer">
      <edit-icon></edit-icon>
    </div>
  </div>
  <custom-modal v-if="this.isModalOpen" @close-modal="this.isModalOpen = false">
    <div class="w-96 flex flex-col gap-5">
      <div>Edit city name:</div>
      <div class="flex gap-2">
        <div class="flex flex-col">
          <div class="text-sm text-black/40">Country:</div>
          <input
            v-model="this.countryValue"
            autofocus
            class="px-4 py-3 rounded-lg outline-none border-2 border-gray-300 w-full"
            placeholder="Country"
            type="text"
          />
        </div>

        <div class="flex flex-col">
          <div class="text-sm text-black/40">City:</div>
          <input
            v-model="this.cityValue"
            autofocus
            class="px-4 py-3 rounded-lg outline-none border-2 border-gray-300 w-full"
            placeholder="City"
            type="text"
          />
        </div>
      </div>
      <div class="flex justify-end">
        <custom-button :fill="true">Save</custom-button>
      </div>
    </div>
  </custom-modal>
</template>

<script>
import EditIcon from "../../assets/svg/EditIcon.vue";
import CustomModal from "../../layouts/CustomModal.vue";
import CustomButton from "../../components/CustomButton.vue";

export default {
  name: "AdminCityCard",
  props: ["name"],
  components: {
    EditIcon,
    CustomModal,
    CustomButton,
  },
  data() {
    return {
      isModalOpen: false,
      cityValue: this.name,
      countryValue: "Kosova",
    };
  },
};
</script>
