<template>
  <div v-if="this.requests.length > 0" class="flex flex-col gap-2 w-full p-2">
    <div
      v-for="(request, index) in requests"
      :key="request.id"
      class="flex justify-between w-full p-2 border rounded-lg border-black/50"
    >
      <div class="flex gap-1 w-full items-center">
        <img
          :src="
            request.sender.profile_picture
              ? `${storageLink}/${request.sender.profile_picture}`
              : defaultProfilePicture
          "
          alt=""
          class="w-8 h-8 object-cover border rounded-full bg-white"
        />
        <div>
          {{ `${request.sender.first_name} ${request.sender.last_name}` }}
        </div>
      </div>
      <div class="flex gap-1 text-sm items-center">
        <div
          v-if="request.status === 'pending'"
          class="bg-gray-300 w-full p-1 cursor-pointer rounded-lg text-black"
          @click="acceptFriendRequest(request.sender.id, index)"
        >
          Accept
        </div>
        <div
          v-if="request.status === 'pending'"
          class="bg-black w-full p-1 cursor-pointer rounded-lg text-white"
          @click="declineFriendRequest(request.sender.id, index)"
        >
          Decline
        </div>
        <div v-if="request.status === 'declined'" class="text-sm text-black/50">
          Declined
        </div>
        <div v-if="request.status === 'accepted'" class="text-sm text-black/50">
          Accepted
        </div>
      </div>
    </div>
  </div>
  <div v-else class="text-xs text-black/50">No pending requests</div>
</template>

<script>
import Friend from "@/services/friend";

export default {
  name: "FriendRequests",
  props: ["user"],
  beforeMount() {
    this.getFriendRequests();
  },
  data() {
    return {
      requests: [],
      storageLink: process.env.VUE_APP_STORAGE_URL,
      defaultProfilePicture: require("../../assets/images/default-user-pic.png"),
    };
  },
  methods: {
    async getFriendRequests() {
      const response = await Friend.getFriendRequests(
        this.$store.getters["users/getToken"]
      );
      if (response) this.requests = response.requests;
    },
    async acceptFriendRequest(id, index) {
      const response = await Friend.acceptFriendRequest(
        id,
        this.$store.getters["users/getToken"]
      );
      if (response) this.requests[index].status = "accepted";
    },
    async declineFriendRequest(id, index) {
      const response = await Friend.declineFriendRequest(
        id,
        this.$store.getters["users/getToken"]
      );
      if (response) this.requests[index].status = "declined";
    },
  },
};
</script>
