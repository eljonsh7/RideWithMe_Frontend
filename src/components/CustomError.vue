<template>
  <p class="text-sm text-left text-red-600 px-1">{{ text }}</p>
</template>

<script>
export default {
  name: "CustomError",
  props: ["text"],
};
</script>
