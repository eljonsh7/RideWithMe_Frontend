<template>
  <div class="w-full flex flex-col gap-3">
    <div class="font-bold text-2xl">Friends</div>
    <div class="flex flex-col gap-4">
      <div v-for="friend in friends" :key="friend" class="flex items-center">
        <img
          :src="friendImage(friend.profile_picture)"
          alt=""
          class="w-10 h-10 rounded-full bg-white cursor-pointer"
          @click="this.$router.push('/profile/' + friend.id)"
        />
        <p
          class="cursor-pointer ml-2"
          @click="this.$router.push('/profile/' + friend.id)"
        >
          {{ friend.first_name + " " + friend.last_name }}
        </p>
      </div>
      <p v-if="friends.length === 0" class="font-bold text-lg">
        User has no friends at the moment.
      </p>
    </div>
  </div>
</template>

<script>
import Friend from "../../services/friend.js";

export default {
  name: "MyFriends",
  components: {},
  props: ["user"],
  created() {
    this.getMyFriends();
  },
  data() {
    return {
      friends: [],
      maxFriends: 5,
      loggedUser: this.$store.getters["users/getUser"],
      storageLink: process.env.VUE_APP_STORAGE_URL,
    };
  },
  methods: {
    async getMyFriends() {
      const response = await Friend.getUserFriends(
        this.$route.params.user_id
          ? this.$route.params.user_id
          : this.loggedUser.id,
        this.$store.getters["users/getToken"]
      );
      this.friends = response.friends;
    },
    friendImage(profile_picture) {
      return profile_picture
        ? `${this.storageLink}/${profile_picture}`
        : require("../../assets/images/default-user-pic.png");
    },
  },
};
</script>
