<template>
  <RouterLink
    :class="{ 'bg-black/20 border-black/60': isRouteThis }"
    :to="`${route}`"
    class="border-x-2 hover:bg-black/30 border-white hover:border-black/70 text-black w-full px-4 py-2 text-center"
  >
    {{ name }}
  </RouterLink>
</template>

<script>
export default {
  name: "NavLink",
  props: ["route", "name"],
  computed: {
    isRouteThis() {
      return this.$route.name === "admin" + this.name;
    },
  },
};
</script>
