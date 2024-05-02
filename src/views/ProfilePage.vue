<template>
  <div class="flex flex-col justify-center items-center p-5 gap-4">
    <div>
      <img
        :src="
          this.user
            ? this.user.profile_picture
            : require('../assets/images/default-user-pic.png') ||
              require('../assets/images/default-user-pic.png')
        "
        alt="."
        class="border rounded-full w-48 aspect-square"
      />
    </div>
    <div class="text-2xl font-bold">{{ fullName }}</div>
    <div
      class="bg-gray-100 rounded-lg w-1/2 flex text-center p-1 gap-2 text-sm"
    >
      <div
        :class="{ 'bg-white': this.atMyRoutes }"
        class="w-full py-1 cursor-pointer rounded-lg"
        @click="this.atMyRoutes = true"
      >
        My Routes
      </div>
      <div
        :class="{ 'bg-white': !this.atMyRoutes }"
        class="w-full py-1 cursor-pointer rounded-lg"
        @click="this.atMyRoutes = false"
      >
        My Reservations
      </div>
    </div>
    <div class="w-2/3 text-center">
      <my-routes v-if="this.atMyRoutes" />
      <my-reservations v-if="!this.atMyRoutes" />
    </div>
  </div>
</template>

<script>
import MyRoutes from "../layouts/private/MyRoutes.vue";
import MyReservations from "../layouts/private/MyReservations";

export default {
  name: "ProfilePage",
  components: { MyRoutes, MyReservations },
  mounted() {
    if (sessionStorage.getItem("isLoggedIn"))
      this.user = this.$store.getters["users/getUser"];
    else this.$router.push("/login");
  },
  computed: {
    fullName() {
      return this.user
        ? `${this.user.first_name} ${this.user.last_name}`
        : "Not you";
    },
  },
  data() {
    return {
      user: {},
      atMyRoutes: true,
    };
  },
};
</script>
