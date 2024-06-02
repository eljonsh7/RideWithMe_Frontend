<template>
  <input
    :value="modelValue"
    class="w-full border border-gray-500 p-2 rounded-lg bg-white text-black text-center outline-none"
    v-bind="$attrs"
    @input="this.$emit('update:modelValue', $event.target.value)"
  />
</template>

<script>
export default {
  name: "CustomInput",
  props: ["modelValue"],
};
</script>
