<template>
  <div
    v-if="message.sender.id === this.loggedInUserId"
    class="flex justify-end items-center"
  >
    <div
      class="bg-white border border-black/50 px-2 py-1 pl-4 rounded-xl text-black"
      style="max-width: 70%"
    >
      <div class="text-xs text-right">Me</div>
      <div style="overflow-wrap: anywhere">{{ message.content }}</div>
      <div class="text-black/40 font-semibold text-xs text-right">
        {{ time }}
      </div>
      <div class="flex justify-end">
        <div v-if="message.status === 'sending'" class="loader"></div>
        <div v-else-if="message.status === 'failed'" class="text-xs">!</div>
      </div>
    </div>
    <img
      :src="
        message.sender.profile_picture
          ? `${this.storageLink}/${message.sender.profile_picture}`
          : require('../assets/images/default-user-pic.png')
      "
      alt=""
      class="object-cover w-12 h-12 rounded-full ml-1 border border-black/50"
    />
  </div>
  <div v-else class="flex justify-start items-center">
    <img
      :src="
        message.sender.profile_picture
          ? `${this.storageLink}/${message.sender.profile_picture}`
          : require('../assets/images/default-user-pic.png')
      "
      alt=""
      class="object-cover w-12 h-12 rounded-full mr-1 border border-black/50"
    />
    <div
      class="bg-white border border-black/50 px-2 py-1 pr-4 rounded-xl text-black"
      style="max-width: 70%"
    >
      <div class="font-semibold text-sm">
        {{ `${message.sender.first_name} ${message.sender.last_name}` }}
      </div>
      <div style="overflow-wrap: anywhere">{{ message.content }}</div>
      <div class="text-black/40 font-semibold text-xs text-left">
        {{ time }}
      </div>
    </div>
  </div>
</template>

<script>
import Date from "../utils/date.js";

export default {
  name: "GroupChatMessage",
  props: ["message", "loggedInUserId"],
  data() {
    return {
      storageLink: process.env.VUE_APP_STORAGE_URL,
    };
  },
  computed: {
    time() {
      return Date.getTime(this.message.created_at);
    },
  },
};
</script>

<style>
.loader {
  width: 10px;
  aspect-ratio: 1;
  border-radius: 50%;
  background: radial-gradient(farthest-side, gray 94%, #0000) top/2px 2px
      no-repeat,
    conic-gradient(#0000 20%, gray);
  animation: l13 1s infinite linear;
}

@keyframes l13 {
  100% {
    transform: rotate(1turn);
  }
}
</style>
