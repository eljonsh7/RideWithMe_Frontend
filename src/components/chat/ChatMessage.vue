<template>
  <div v-if="message.user_id === this.loggedInUserId" class="flex justify-end">
    <div
      class="bg-white border border-black/50 px-2 py-1 pl-4 rounded-xl text-black"
      style="max-width: 70%"
    >
      <div style="overflow-wrap: anywhere">{{ message.content }}</div>
      <div class="text-black/40 font-semibold text-xs text-right">
        {{ time }}
      </div>
      <div class="flex justify-end">
        <div v-if="message.status === 'sending'" class="loader"></div>
        <div v-else-if="message.status === 'failed'" class="text-xs">!</div>
      </div>
    </div>
  </div>
  <div v-else class="flex justify-start">
    <div
      class="bg-white border border-black/50 px-2 py-1 pr-4 rounded-xl text-black"
      style="max-width: 70%"
    >
      <div style="overflow-wrap: anywhere">{{ message.content }}</div>
      <div class="text-black/40 font-semibold text-xs text-left">
        {{ time }}
      </div>
    </div>
  </div>
</template>

<script>
import Date from "../../utils/date.js";

export default {
  name: "ChatMessage",
  props: ["message", "loggedInUserId"],
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
