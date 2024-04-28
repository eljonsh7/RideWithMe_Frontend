<template>
  <div
    class="flex w-full justify-between px-5 py-8 border-b border-gray-200 rounded-lg shadow-lg cursor-pointer"
  >
    {{ this.car.name }}
  </div>
</template>

<script>
export default {
  name: "AdminCarCard",
  props: ["id", "car"],
};
</script>
