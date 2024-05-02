<template>
  <custom-modal
    v-if="this.isModalOpen"
    @closeModal="this.isModalOpen = false"
  ></custom-modal>
  <div class="flex w-full">
    <div class="flex justify-center items-center w-full">dashboard</div>
  </div>
</template>

<script>
import CustomModal from "../../layouts/CustomModal.vue";

export default {
  name: "AdminHomePage",
  components: {
    CustomModal,
  },
  data() {
    return {
      isModalOpen: false,
    };
  },
};
</script>
