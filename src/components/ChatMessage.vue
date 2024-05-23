<template>
  <div v-if="message.user_id === this.loggedInUserId" class="flex justify-end">
    <div
      class="bg-white border border-black/50 px-2 py-1 pl-4 rounded-l-full text-black"
    >
      <div>{{ message.content }}</div>
      <div class="flex justify-end">
        <div v-if="message.status === 'sending'" class="loader"></div>
        <div v-else-if="message.status === 'failed'" class="text-xs">!</div>
      </div>
    </div>
  </div>
  <div v-else class="flex justify-start">
    <div
      class="bg-white border border-black/50 p-2 pr-4 rounded-r-full text-black"
    >
      {{ message.content }}
    </div>
  </div>
</template>

<script>
export default {
  name: "ChatMessage",
  props: ["message", "loggedInUserId"],
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
