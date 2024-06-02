<template>
  <div
    class="w-full h-fit px-10 hidden md:flex justify-between items-center border-b border-black/50"
    @click="this.showProfileOptions = false"
  >
    <div class="flex gap-10">
      <RouterLink to="/home">
        <img
          alt="Not Found!"
          class="w-12 h-12 my-2"
          src="../../assets/images/logo.png"
        />
      </RouterLink>
      <div class="flex gap-x-4 items-center text-black">
        <NavLink v-for="route in routes" :key="route" :text="route" />
      </div>
    </div>
    <div v-if="this.isLoggedIn" class="flex items-center cursor-pointer gap-4">
      <div
        class="rounded-full border border-black/50 cursor-pointer p-2 hover:bg-black/10"
        @click="this.showSearch = true"
      >
        <SearchIcon class="w-6 h-6" />
      </div>
      <div
        class="rounded-full border border-black/50 cursor-pointer p-2 hover:bg-black/10"
        @click="this.showNotifications = true"
      >
        <BellIcon />
      </div>
      <img
        :src="userImage"
        alt=""
        class="w-10 h-10 border border-black/50 rounded-full bg-white cursor-pointer object-cover"
        @click.stop="showProfileOptions = !showProfileOptions"
      />
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
  <div class="md:hidden flex flex-col">
    <div class="flex justify-between items-center px-2">
      <RouterLink to="/home">
        <img
          alt="Not Found!"
          class="w-12 h-12 my-2"
          src="../../assets/images/logo.png"
        />
      </RouterLink>
      <VerticalDotsIcon class="cursor-pointer" @click="this.show = !show" />
    </div>
    <div
      v-if="this.show"
      class="fixed top-16 z-50 bg-white w-full h-full flex flex-col gap-4"
    >
      <div class="flex flex-col gap-4 items-center text-black">
        <NavLink v-for="route in routes" :key="route" :text="route" />
      </div>
      <div
        v-if="this.isLoggedIn"
        class="flex flex-col gap-4 items-center cursor-pointer px-2"
      >
        <div
          class="rounded-full border border-black/50 cursor-pointer p-2 hover:bg-black/10"
          @click="this.showSearch = true"
        >
          <SearchIcon class="w-6 h-6" />
        </div>
        <div
          class="rounded-full border border-black/50 cursor-pointer p-2 hover:bg-black/10"
          @click="this.showNotifications = true"
        >
          <BellIcon />
        </div>
        <p
          class="hover:bg-black/30 py-2 w-full text-center items-center flex justify-center text-xs cursor-pointer"
          @click="this.$router.push('/profile')"
        >
          Profile
        </p>
        <p
          v-if="isAdmin"
          class="hover:bg-black/30 py-2 w-full text-center items-center flex justify-center text-xs cursor-pointer"
          @click="this.$router.push('/admin/home')"
        >
          Admin
        </p>
        <p
          class="hover:bg-black/30 py-2 w-full text-center items-center flex justify-center text-xs cursor-pointer"
          @click="this.logOutModal = true"
        >
          Log Out
        </p>
      </div>
    </div>
  </div>
  <ConfirmBox
    v-if="this.logOutModal"
    @close-modal="this.logOutModal = false"
    @confirm-action="logOut"
  >
    Are you sure you want to log out?
  </ConfirmBox>
  <NotificationsModal
    v-show="this.showNotifications"
    @close-modal="this.showNotifications = false"
  />
  <SearchUsersModal
    v-show="this.showSearch"
    @close-modal="this.showSearch = false"
  />
</template>

<script>
import NavLink from "@/components/general/NavLink.vue";
import ConfirmBox from "./ConfirmBox.vue";
import BellIcon from "@/components/icons/BellIcon.vue";
import NotificationsModal from "@/layouts/ui/NotificationsModal.vue";
import SearchIcon from "@/components/icons/SearchIcon.vue";
import SearchUsersModal from "@/layouts/ui/SearchUsersModal.vue";
import VerticalDotsIcon from "@/components/icons/VerticalDotsIcon.vue";

export default {
  components: {
    VerticalDotsIcon,
    SearchUsersModal,
    SearchIcon,
    NotificationsModal,
    BellIcon,
    ConfirmBox,
    NavLink,
  },
  emits: ["unbind-channel"],
  computed: {
    isLoggedIn() {
      return sessionStorage.getItem("token");
    },
    isAdmin() {
      return this.$store.getters["users/getUser"].is_admin === 1;
    },
    userImage() {
      return this.user.profile_picture
        ? `${process.env.VUE_APP_STORAGE_URL}/${this.user.profile_picture}`
        : require("../../assets/images/default-user-pic.png");
    },
  },
  beforeMount() {
    this.routes = sessionStorage.getItem("token")
      ? ["reservations", "chat", "about us"]
      : ["about us"];
  },
  data() {
    return {
      logOutModal: false,
      showProfileOptions: false,
      showNotifications: false,
      showSearch: false,
      routes: [],
      user: this.$store.getters["users/getUser"],
      show: false,
    };
  },
  methods: {
    async logOut() {
      await this.$store.dispatch("users/logOut");
      this.logOutModal = false;
      this.$emit("unbind-channel");
      this.$router.push("/login");
    },
  },
};
</script>
