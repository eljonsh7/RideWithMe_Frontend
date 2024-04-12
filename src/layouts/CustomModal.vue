<template>
  <div
    class="w-screen h-screen top-0 right-0 flex justify-center items-center bg-black/40 absolute"
    @click="this.$emit('closeModal')"
  >
    <div
      class="w-auto h-auto p-5 rounded-lg border-2 border-black bg-white flex flex-col gap-2"
      @click.stop
    >
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "CustomModal",
  emits: ["closeModal"],
};
</script>
