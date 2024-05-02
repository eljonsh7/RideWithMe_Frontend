<template>
  <div
    class="w-screen h-screen top-0 right-0 flex justify-center items-center bg-black/40 fixed z-50"
    @click="this.$emit('close-modal')"
  >
    <div
      class="h-auto w-5/6 sm:w-2/3 md:w-1/2 p-6 md:p-10 rounded-lg border-2 border-black bg-white flex flex-col gap-2"
      @click.stop
    >
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "CustomModal",
  emits: ["close-modal"],
};
</script>
