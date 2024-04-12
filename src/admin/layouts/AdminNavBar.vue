<template>
  <div class="h-screen w-64 flex flex-col gap-2 border-r border-black/40 pb-20">
    <div class="flex justify-center">
      <img class="w-28 h-28" src="../assets/images/logo.png" />
    </div>
    <div class="flex flex-col w-full h-full justify-center items-center gap-1">
      <admin-nav-link
        v-for="route in routes"
        :key="route"
        :name="route.name"
        :route="route.route"
      ></admin-nav-link>
    </div>
  </div>
</template>

<script>
import AdminNavLink from "../components/AdminNavLink.vue";

export default {
  name: "NavBar",
  components: { AdminNavLink },
  data() {
    return {
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
};
</script>
