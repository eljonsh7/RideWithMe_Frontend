<template>
  <button
    :class="{
      'bg-black text-white': fill,
    }"
    class="py-2 px-5 rounded-lg border-black/90 border-2"
    type="submit"
  >
    <slot />
  </button>
</template>

<script>
export default {
  name: "CustomButton",
  props: ["fill"],
};
</script>
