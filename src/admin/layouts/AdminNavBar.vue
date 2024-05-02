<template>
  <div
    class="flex md:hidden w-full h-auto px-4 py-3 justify-between border-b-2 border-black/20 items-center"
  >
    <a href="/home">
      <img class="w-16 h-16" src="../assets/images/logo.png" />
    </a>
    <bars-icon
      class="cursor-pointer"
      @click="this.isShown = !this.isShown"
    ></bars-icon>
  </div>
  <div
    :class="{ 'fixed top-0 left-0': isShown, 'hidden md:flex': !isShown }"
    class="h-screen md:w-64 w-full flex flex-col justify-between gap-2 border-r border-black/40 pb-20 bg-white"
  >
    <div class="flex md:justify-center justify-between px-4 py-3 items-center">
      <a href="/home">
        <img
          class="w-16 h-16 md:w-28 md:h-28"
          src="../assets/images/logo.png"
        />
      </a>
      <x-mark
        class="cursor-pointer md:hidden flex"
        @click="this.isShown = !this.isShown"
      ></x-mark>
    </div>
    <div
      class="flex flex-col w-full md:h-full justify-center items-center gap-1"
    >
      <admin-nav-link
        v-for="route in routes"
        :key="route"
        :name="route.name"
        :route="route.route"
      ></admin-nav-link>
    </div>
    <div>
      <div
        class="border-x-2 hover:bg-black/30 border-white hover:border-black/70 text-black w-full px-4 py-2 text-center cursor-pointer"
        @click="this.logOutModal = true"
      >
        Log out
      </div>
    </div>
  </div>
  <confirm-box
    v-if="this.logOutModal"
    @close-modal="this.logOutModal = false"
    @confirm-action="logOut"
  >
    Are you sure you want to log out?
  </confirm-box>
</template>

<script>
import AdminNavLink from "../components/AdminNavLink.vue";

import BarsIcon from "../../components/icons/BarsIcon.vue";
import xMark from "../../components/icons/xMark.vue";
import ConfirmBox from "@/layouts/ConfirmBox.vue";

export default {
  name: "NavBar",
  components: {
    ConfirmBox,
    AdminNavLink,
    BarsIcon,
    xMark,
  },
  beforeMount() {
    if (!sessionStorage.getItem("isLoggedIn")) {
      this.$router.push("/admin/login");
    }
  },
  watch: {
    $route() {
      this.isShown = false;
    },
  },
  data() {
    return {
      logOutModal: false,
      isShown: false,
      routes: [
        {
          route: "/admin/home",
          name: "Home",
        },
        {
          route: "/admin/users",
          name: "Users",
        },
        {
          route: "/admin/cities",
          name: "Cities",
        },
        {
          route: "/admin/cars",
          name: "Cars",
        },
      ],
    };
  },
  methods: {
    async logOut() {
      await this.$store.dispatch("users/logOut");
      this.logOutModal = false;
      this.$router.push("/admin/login");
    },
  },
};
</script>
