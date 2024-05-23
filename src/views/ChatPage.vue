<template>
  <div class="flex h-full overflow-y-hidden">
    <div
      class="flex flex-col w-1/4 border-r border-black/20 h-full overflow-y-auto"
      style="scrollbar-width: none"
    >
      <div
        class="h-28 flex flex-col justify-center items-center bg-white border-b border-black/20"
      >
        <div class="uppercase text-md font-semibold">Messages</div>
        <div class="text-black/50 text-sm">121</div>
      </div>
      <div
        v-if="this.conversations.length === 0"
        class="text-center pt-2 text-sm text-black/50"
      >
        No conversations found.
      </div>
      <div v-else>
        <chat-conversation
          v-for="conversation in this.conversations"
          :key="conversation"
          :class="{
            'bg-gray-200': this.selectedConversation == conversation,
          }"
          :conversation="conversation"
          @click="this.selectedConversation = conversation"
        />
      </div>
    </div>
    <div class="bg-black/20 w-3/4 h-full flex flex-col">
      <div v-if="this.selectedConversation" class="h-3/4">
        <div
          class="h-28 px-3 gap-3 flex justify-between items-center bg-white border-b border-black/20"
        >
          <div class="w-16 flex items-center justify-center h-16">
            <img
              :src="
                selectedConversation.sender.profile_picture ||
                require('../assets/images/default-user-pic.png')
              "
              alt="."
              class="w-12 h-12 rounded-full object-cover border border-black/20"
            />
          </div>
          <div class="font-semibold text-base w-full">
            {{
              `${selectedConversation.sender.first_name} ${selectedConversation.sender.last_name}`
            }}
          </div>
        </div>
        <chat-messages :conversation="selectedConversation"></chat-messages>
      </div>
      <div v-else class="w-full h-full flex justify-center items-center">
        <div class="text-black/50 text-sm">No conversation selected!</div>
      </div>
    </div>
  </div>
</template>

<script>
import Chat from "../services/chat.js";
import ChatMessages from "../layouts/private/ChatMessages.vue";
import ChatConversation from "../layouts/private/ChatConversation.vue";
// import Pusher from "../utils/pusher.js";

export default {
  name: "ChatPage",
  components: { ChatConversation, ChatMessages },
  data() {
    return {
      conversations: [],
      selectedConversation: null,
    };
  },
  beforeMount() {
    this.getChats();
    // Pusher.unbindChannel();
    // Pusher.createPusher();
  },
  methods: {
    async getChats() {
      const response = await Chat.getChats(sessionStorage.getItem("token"));
      console.log(response);
      this.conversations = response.conversations;
    },
  },
};
</script>
