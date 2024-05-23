<template>
  <div
    class="w-full h-fit px-10 flex justify-between items-center"
    @click="this.showProfileOptions = false"
  >
    <div class="flex gap-10">
      <router-link to="/home">
        <img
          alt="Not Found!"
          class="w-12 h-12 my-2"
          src="../assets/images/logo.png"
        />
      </router-link>
      <div class="flex gap-x-4 items-center text-black">
        <nav-link v-for="route in routes" :key="route" :text="route"></nav-link>
      </div>
    </div>
    <div v-if="this.isLoggedIn" class="flex items-center cursor-pointer">
      <div class="flex items-center gap-1 cursor-pointer">
        <img
          alt="Not Found!"
          class="w-10 h-10 border border-black rounded-full bg-white cursor-pointer"
          src="../assets/images/default-user-pic.png"
          @click.stop="showProfileOptions = !showProfileOptions"
        />
      </div>
    </div>
    <div v-else class="flex gap-3">
      <a class="text-black/60 underline text-sm hover:text-black" href="/login"
        >Log in</a
      >
      <a
        class="text-black/60 underline text-sm hover:text-black"
        href="/register"
        >Sign up</a
      >
    </div>
  </div>
  <div
    v-if="this.showProfileOptions"
    class="w-full h-5/6 top-16 left-0 absolute"
    @click="this.showProfileOptions = false"
  >
    <div
      class="w-24 h-auto bg-black absolute right-10 text-white rounded-lg flex flex-col justify-evenly items-center uppercase"
    >
      <p
        class="hover:bg-white/30 py-2 w-full rounded-t-lg text-center items-center flex justify-center text-xs cursor-pointer"
        @click="this.$router.push('/profile')"
      >
        Profile
      </p>
      <p
        v-if="isAdmin"
        class="hover:bg-white/30 py-2 w-full text-center items-center flex justify-center text-xs cursor-pointer"
        @click="this.$router.push('/admin/home')"
      >
        Admin
      </p>
      <p
        class="hover:bg-white/30 py-2 w-full rounded-b-lg text-center items-center flex justify-center text-xs cursor-pointer"
        @click="this.logOutModal = true"
      >
        Log Out
      </p>
    </div>
  </div>
  <hr />
  <confirm-box
    v-if="this.logOutModal"
    @closeModal="this.logOutModal = false"
    @confirm-action="logOut"
  >
    Are you sure you want to log out?
  </confirm-box>
</template>

<script>
import NavLink from "../components/NavLink.vue";
import ConfirmBox from "../layouts/ConfirmBox.vue";

export default {
  components: {
    ConfirmBox,
    NavLink,
  },
  computed: {
    isLoggedIn() {
      return sessionStorage.getItem("isLoggedIn");
    },
  },
  data() {
    return {
      logOutModal: false,
      showProfileOptions: false,
      routes: ["reservations", "chat", "about us"],
    };
  },
  methods: {
    async logOut() {
      await this.$store.dispatch("users/logOut");
      this.logOutModal = false;
      this.$router.push("/login");
    },
    isAdmin() {
      try {
        return this.$store.getters["users/getUser"].is_admin;
      } catch (e) {
        return false;
      }
    },
  },
};
</script>
