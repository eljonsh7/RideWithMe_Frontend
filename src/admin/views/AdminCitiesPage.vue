<template>
  <div class="flex flex-col w-full p-5 gap-5">
    <div class="flex justify-center text-3xl font-extrabold">Cities</div>
    <div class="flex w-full justify-end">
      <custom-button :fill="true" @click="isAddModalOpen = true"
        >Add city
      </custom-button>
    </div>
    <div class="grid grid-cols-3 gap-2">
      <admin-city-card
        v-for="city in cities"
        :key="city"
        :name="city"
      ></admin-city-card>
    </div>
  </div>
  <custom-modal
    v-if="this.isAddModalOpen"
    @close-modal="
      this.isAddModalOpen = false;
      this.addCityValue = '';
    "
  >
    <div class="w-96 flex flex-col gap-5">
      <div>Edit city name:</div>
      <input
        v-model="this.addCityValue"
        autofocus
        class="px-4 py-3 rounded-lg outline-none border-2 border-gray-300 w-full"
        placeholder="City name"
        type="text"
      />
      <div class="flex justify-end">
        <custom-button :fill="true">Add</custom-button>
      </div>
    </div>
  </custom-modal>
</template>

<script>
import AdminCityCard from "../components/AdminCityCard.vue";
import CustomButton from "../../components/CustomButton.vue";
import CustomModal from "../../layouts/CustomModal.vue";

export default {
  name: "AdminCitiesPage",
  components: {
    AdminCityCard,
    CustomButton,
    CustomModal,
  },
  data() {
    return {
      isAddModalOpen: false,
      cities: ["Prishtina", "Drenasi", "Malisheva"],
      addCityValue: "",
    };
  },
};
</script>
