<template>
  <select
    :value="modelValue"
    class="md:w-40 w-full border border-gray-500 rounded-lg bg-white text-black text-center outline-none"
    style="padding: 0.65rem"
    v-bind="$attrs"
    @input="this.$emit('update:modelValue', $event.target.value)"
  >
    <option v-for="option in options" :key="option.id" :value="option.id">
      {{ option.name }}
    </option>
  </select>
</template>

<script>
export default {
  name: "CustomSelect",
  props: ["modelValue", "options"],
};
</script>
