<template>
  <custom-modal @close-modal="this.$emit('close-modal')">
    <div class="flex flex-col gap-10">
      <slot></slot>
      <div class="flex w-full justify-between">
        <custom-button :fill="false" @click="this.$emit('close-modal')"
          >No
        </custom-button>
        <custom-button :fill="true" @click="this.$emit('confirm-action')"
          >Yes</custom-button
        >
      </div>
    </div>
  </custom-modal>
</template>

<script>
import CustomModal from "./CustomModal.vue";
import CustomButton from "../components/CustomButton.vue";

export default {
  name: "ConfirmBox",
  components: { CustomButton, CustomModal },
  emits: ["close-modal", "confirm-action"],
};
</script>
