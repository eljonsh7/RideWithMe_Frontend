<template class="h-full flex">
  <div
    v-if="
      !this.$route.path.includes('login') &&
      !this.$route.path.includes('register') &&
      !this.$route.path.includes('admin')
    "
    class="flex w-full h-full flex-col"
  >
    <nav-bar></nav-bar>
    <router-view></router-view>
  </div>
  <div
    v-if="
      this.$route.path.includes('admin') && !this.$route.path.includes('login')
    "
    class="w-full h-full flex"
  >
    <admin-nav-bar></admin-nav-bar>
    <router-view></router-view>
  </div>
</template>

<script>
import NavBar from "./layouts/NavBar.vue";
import AdminNavBar from "./admin/layouts/AdminNavBar.vue";

export default {
  name: "App",
  components: {
    NavBar,
    AdminNavBar,
  },
  data() {
    return {
      currentComponent: "",
    };
  },
  beforeRouteEnter(to, from, next) {
    console.log(to);
    this.currentComponent = to.matched[0].components.default.name;
    console.log(this.currentComponent);
    next();
  },
};
</script>

<style>
@font-face {
  font-family: "SFPro";
  src: url("assets/fonts/regularSfPro.OTF") format("opentype");
}

* {
  font-family: "SFPro", "Franklin Gothic Book", serif;
  letter-spacing: 0.025em;
}
</style>
