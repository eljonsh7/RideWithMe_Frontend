<template>
  <div class="flex flex-col justify-center items-center p-5 gap-4">
    <div>
      <img
        :src="imageSource"
        alt="."
        class="border border-black/50 rounded-full w-48 aspect-square"
      />
    </div>
    <div class="flex gap-2 items-center">
      <div class="text-2xl font-bold">{{ fullName }}</div>
      <EditIcon
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
      <MyRoutes
        v-if="this.currentPage === 'myRoutes'"
        :user="this.user"
        @get-user="this.user = this.$store.getters['users/getUser']"
      />
      <MyReservations
        v-if="this.currentPage === 'myReservations'"
        :user="this.user"
      />
      <EditProfile
        v-if="this.currentPage === 'editProfile'"
        :user="this.user"
        @close-form="this.currentPage = 'myRoutes'"
        @update-car="this.currentPage = 'editCarForm'"
        @user-updated="updateUser"
      />
      <SelectCarForm
        v-if="this.currentPage === 'editCarForm'"
        :car="this.user.user_car"
        @close-form="closeForm"
      />
    </div>
  </div>
</template>

<script>
import MyRoutes from "@/layouts/profile/MyRoutes.vue";
import MyReservations from "@/layouts/profile/MyReservations";
import EditIcon from "@/components/icons/EditIcon.vue";
import EditProfile from "@/layouts/profile/EditProfile.vue";
import SelectCarForm from "@/layouts/profile/SelectCarForm.vue";

export default {
  name: "ProfilePage",
  components: {
    SelectCarForm,
    EditProfile,
    EditIcon,
    MyRoutes,
    MyReservations,
  },
  beforeMount() {
    if (sessionStorage.getItem("token"))
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
    updateUser(userObject) {
      if (userObject.profile_picture)
        this.user.profile_picture = userObject.profile_picture;
      if (userObject.first_name) this.user.first_name = userObject.first_name;
      if (userObject.last_name) this.user.last_name = userObject.last_name;
      if (userObject.role) this.user.role = userObject.role;

      this.currentPage = "myRoutes";
    },
    async closeForm(value = false) {
      this.currentPage = "myRoutes";
      if (value) {
        await this.$store.dispatch(
          "users/getUserByToken",
          this.$store.getters["users/getToken"]
        );
        this.user = this.$store.getters["users/getUser"];
      }
    },
  },
};
</script>
