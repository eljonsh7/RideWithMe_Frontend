<template>
  <div
    class="md:flex md:justify-center md:items-center md:h-screen md:text-center h-full flex-col bg-black/60 mb-20 w-full md:mb-0 2xl:mt-16"
  >
    <div
      class="card bg-black px-8 pt-20 md:py-10 shadow-lg text-center w-full md:w-2/5 h-screen md:h-1/3 justify-evenly flex flex-col rounded-xl border-4 border-sky-500"
    >
      <h1 class="text-2xl text-white">Page not found</h1>
      <p class="text-white">
        This page could not be found - check out
        <router-link class="text-sky-500" to="/home">HOME</router-link>
        .
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "NotFound",
  computed: {
    isLoggedIn() {
      return JSON.parse(sessionStorage.getItem("isLoggedIn"));
    },
  },
};
</script>

<style scoped>
@media (min-width: 768px) {
  .card {
    width: 570px;
  }
}
</style>
