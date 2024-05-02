<template>
  <router-link
    :to="`/${text.replace(' ', '-')}`"
    class="h-full flex text-sm items-center px-2 text-center border-b-2 border-b-white hover:border-b-gray-500 hover:text-gray-600"
  >
    <p class="uppercase">{{ text }}</p>
  </router-link>
</template>

<script>
export default {
  props: ["text"],
};
</script>
