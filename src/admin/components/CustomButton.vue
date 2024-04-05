<script>
export default {
  name: "PrimaryButton",
  props: ["text"],
};
</script>

<template>
  <button class="py-2 px-3 bg-black/90 hover:bg-black text-white rounded-lg">
    {{ text }}
  </button>
</template>

<style scoped></style>
