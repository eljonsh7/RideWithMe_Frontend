<template>
  <div class="flex w-full">
    <div class="flex justify-center items-center w-full">dashboard</div>
  </div>
</template>

<script>
export default {
  name: "AdminHomePage",
  data() {
    return {
      isModalOpen: false,
    };
  },
  beforeMount() {
    if (
      !this.$store.getters["users/getUser"] ||
      this.$store.getters["users/getUser"].is_admin === 0
    )
      this.$router.push("/");
  },
};
</script>
