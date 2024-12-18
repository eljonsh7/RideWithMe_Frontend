<template>
  <div class="flex flex-col justify-center items-center gap-4">
    <div class="h-0 w-full mb-10">
      <div class="bg-black/50 h-44"></div>
    </div>
    <div>
      <img
        :src="imageSource"
        alt="."
        class="border border-black/50 rounded-full w-48 aspect-square object-cover bg-white"
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
      class="bg-gray-100 rounded-lg w-fit flex text-center p-1 gap-2 text-sm items-center"
    >
      <div
        :class="{ 'bg-white': this.currentPage === 'myRoutes' }"
        class="w-full py-1 cursor-pointer rounded-lg"
        @click="this.currentPage = 'myRoutes'"
      >
        My Routes
      </div>
      <div
        :class="{ 'bg-white': this.currentPage === 'myRatings' }"
        class="w-full py-1 cursor-pointer rounded-lg"
        @click="this.currentPage = 'myRatings'"
      >
        My Reviews
      </div>
      <div
        :class="{ 'bg-white': this.currentPage === 'friendRequests' }"
        class="w-full py-1 cursor-pointer rounded-lg"
        @click="this.currentPage = 'friendRequests'"
      >
        Friend requests
      </div>
    </div>
    <div class="w-full flex flex-col md:grid grid-cols-9 p-5 gap-y-5">
      <div class="col-span-2"></div>
      <div class="col-span-5 text-center flex">
        <MyRoutes
          v-if="this.currentPage === 'myRoutes'"
          :user="this.user"
          @get-user="this.user = this.$store.getters['users/getUser']"
        />
        <MyRatings v-if="this.currentPage === 'myRatings'" :user="this.user" />
        <MyReservations
          v-if="this.currentPage === 'myReservations'"
          :user="this.user"
        />
        <FriendRequests
          v-if="this.currentPage === 'friendRequests'"
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
          :car="this.user.userCar"
          @close-form="closeForm"
        />
      </div>
      <div class="col-span-2">
        <MyFriends :user="this.user" />
      </div>
    </div>
  </div>
</template>

<script>
import MyRoutes from "@/layouts/profile/MyRoutes.vue";
import MyRatings from "@/layouts/profile/MyRatings.vue";
import MyFriends from "@/layouts/profile/MyFriends.vue";
import EditIcon from "@/components/icons/EditIcon.vue";
import EditProfile from "@/layouts/profile/EditProfile.vue";
import SelectCarForm from "@/layouts/profile/SelectCarForm.vue";
import MyReservations from "@/layouts/profile/MyReservations.vue";
import FriendRequests from "@/layouts/profile/FriendRequests.vue";

export default {
  name: "ProfilePage",
  components: {
    FriendRequests,
    MyReservations,
    SelectCarForm,
    EditProfile,
    EditIcon,
    MyRoutes,
    MyRatings,
    MyFriends,
  },
  beforeMount() {
    if (sessionStorage.getItem("token"))
      this.user = this.$store.getters["users/getUser"];
    else this.$router.push("/login");

    console.log(this.user);
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
        : require("../../assets/images/default-user-pic.png");
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
    updateUser() {
      this.user = this.$store.getters["users/getUser"];
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
