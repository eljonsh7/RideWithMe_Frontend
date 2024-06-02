<template>
  <CustomModal @close-modal="this.$emit('close-modal')">
    <div class="flex flex-col gap-10">
      <slot />
      <div class="flex w-full justify-between">
        <CustomButton :fill="false" @click="this.$emit('close-modal')"
          >No
        </CustomButton>
        <CustomButton :fill="true" @click="this.$emit('confirm-action')"
          >Yes
        </CustomButton>
      </div>
    </div>
  </CustomModal>
</template>

<script>
import CustomModal from "./CustomModal.vue";
import CustomButton from "../../components/form/CustomButton.vue";

export default {
  name: "ConfirmBox",
  components: { CustomButton, CustomModal },
  emits: ["close-modal", "confirm-action"],
};
</script>
