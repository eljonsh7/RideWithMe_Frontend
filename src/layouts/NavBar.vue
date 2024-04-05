<template>
  <div
    class="w-full h-auto px-10 flex justify-between"
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
    <div class="flex items-center cursor-pointer">
      <div class="flex items-center gap-1 cursor-pointer">
        <img
          alt="Not Found!"
          class="w-10 h-10 border border-black rounded-full bg-white cursor-pointer"
          src="../assets/images/default-user-pic.png"
          @click.stop="showProfileOptions = !showProfileOptions"
        />
      </div>
    </div>
  </div>
  <div
    v-if="this.showProfileOptions"
    class="w-full h-5/6 top-16 left-0 absolute"
    @click="this.showProfileOptions = false"
  >
    <div
      class="w-20 h-16 bg-black absolute right-10 text-white rounded-lg flex flex-col justify-evenly items-center uppercase"
    >
      <p
        class="hover:bg-white/10 h-full w-full rounded-t-lg text-center items-center flex justify-center text-xs cursor-pointer"
        @click="this.$router.push('/profile')"
      >
        Profile
      </p>
      <p
        class="hover:bg-white/10 h-full w-full rounded-b-lg text-center items-center flex justify-center text-xs cursor-pointer"
        @click="logOutModal = true"
      >
        Log Out
      </p>
    </div>
  </div>
  <hr />
</template>

<script>
import NavLink from "../components/NavLink.vue";

export default {
  components: {
    NavLink,
  },
  data() {
    return {
      showProfileOptions: false,
      routes: ["routes", "reservations", "chat", "about us"],
    };
  },
};
</script>
