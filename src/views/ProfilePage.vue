<template>
  <div class="flex flex-col justify-center items-center p-5 gap-4">
    <div>
      <img
        :src="imageSource"
        alt="."
        class="border rounded-full w-48 aspect-square"
      />
    </div>
    <div class="flex gap-2 items-center">
      <div class="text-2xl font-bold">{{ fullName }}</div>
      <edit-icon
        class="cursor-pointer"
        @click="this.currentPage = 'editProfile'"
      />
    </div>
    <div
      class="bg-gray-100 rounded-lg w-1/2 flex text-center p-1 gap-2 text-sm"
    >
      <div
        :class="{ 'bg-white': this.currentPage === 'myRoutes' }"
        class="w-full py-1 cursor-pointer rounded-lg"
        @click="this.currentPage = 'myRoutes'"
      >
        My Routes
      </div>
      <div
        :class="{ 'bg-white': this.currentPage === 'myReservations' }"
        class="w-full py-1 cursor-pointer rounded-lg"
        @click="this.currentPage = 'myReservations'"
      >
        My Reservations
      </div>
    </div>
    <div class="w-2/3 text-center">
      <my-routes v-if="this.currentPage === 'myRoutes'" :user="this.user" />
      <my-reservations
        v-if="this.currentPage === 'myReservations'"
        :user="this.user"
      />
      <edit-profile
        v-if="this.currentPage === 'editProfile'"
        :user="this.user"
        @close-form="this.currentPage = 'myRoutes'"
        @user-updated="updateUser"
      />
    </div>
  </div>
</template>

<script>
import MyRoutes from "../layouts/private/MyRoutes.vue";
import MyReservations from "../layouts/private/MyReservations";
import EditIcon from "@/components/icons/EditIcon.vue";
import EditProfile from "@/layouts/private/EditProfile.vue";

export default {
  name: "ProfilePage",
  components: { EditProfile, EditIcon, MyRoutes, MyReservations },
  beforeMount() {
    this.getUser();
  },
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
    imageSource() {
      return this.user && this.user.profile_picture
        ? `${this.storageLink}/${this.user.profile_picture}`
        : require("../assets/images/default-user-pic.png");
    },
  },
  data() {
    return {
      user: {},
      currentPage: "myRoutes",
      storageLink: process.env.VUE_APP_STORAGE_URL,
    };
  },
  methods: {
    async getUser() {
      const response = await this.$store.dispatch(
        "users/getUserByToken",
        sessionStorage.getItem("token")
      );
      this.user = response;
    },
    updateUser(userObject) {
      if (userObject.profile_picture)
        this.user.profile_picture = userObject.profile_picture;
      if (userObject.first_name) this.user.first_name = userObject.first_name;
      if (userObject.last_name) this.user.last_name = userObject.last_name;
      if (userObject.role) this.user.role = userObject.role;

      this.currentPage = "myRoutes";
    },
  },
};
</script>
