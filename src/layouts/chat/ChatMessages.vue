<template>
  <div style="height: 620px">
    <div
      ref="messagesContainer"
      class="h-full flex flex-col gap-1 p-1 overflow-y-scroll"
      style="scrollbar-width: none"
    >
      <ChatMessage
        v-for="message in this.messages"
        :key="message.id"
        :loggedInUserId="userId"
        :message="message"
      >
        {{ message.content }}
      </ChatMessage>
    </div>
    <div
      class="w-full h-auto bottom-0 bg-black/30 flex justify-center content-center flex-wrap"
    >
      <div
        class="w-full h-auto flex items-center m-2 gap-1 flex-row justify-between flex-nowrap"
      >
        <input
          v-model="this.addMessage"
          class="w-full h-auto flex flex-nowrap focus:outline-none bg-white text-left p-3 pr-8 resize-none rounded-lg auto-expand overflow-y-auto"
          placeholder="Write message ..."
          type="text"
          @keydown.enter.prevent="sendMessage"
        />
        <div
          class="w-auto h-full pt-2 flex flex-row md:gap-2 gap-1 justify-end flex-nowrap"
        >
          <button
            :disabled="this.addMessage === ''"
            class="py-1 px-2 relative text-white h-fit rounded-lg bg-black/50"
            @click="sendMessage"
          >
            <i class="fa-regular fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Chat from "../../services/chat.js";
import ChatMessage from "../../components/chat/ChatMessage.vue";

export default {
  name: "ChatMessages",
  components: { ChatMessage },
  props: ["conversation", "newMessage", "userId"],
  emits: ["change-last-message"],
  watch: {
    conversation() {
      this.getMessages();
    },
    newMessage(newValue) {
      if (newValue) this.handleNewMessage(newValue);
    },
  },
  beforeMount() {
    this.getMessages();
  },
  data() {
    return {
      messages: [],
      addMessage: "",
    };
  },
  methods: {
    async getMessages() {
      const response = await Chat.getMessages(
        this.conversation.sender.id,
        "private",
        this.$store.getters["users/getToken"]
      );
      this.messages = response.messages;
      this.scrollToBottom();
      this.markAsRead();
    },
    async sendMessage() {
      const object = {
        message: this.addMessage,
        type: "text",
      };

      var index = this.messages.length;

      this.messages.push({
        content: object.message,
        status: "sending",
        user_id: this.userId,
        created_at: new Date().toISOString(),
      });

      this.addMessage = "";

      this.scrollToBottom();

      const response = await Chat.sendMessage(
        this.conversation.sender.id,
        object,
        this.$store.getters["users/getToken"]
      );

      if (response) {
        this.messages[index].status = "sent";
        this.$emit("change-last-message", object.message, false);
      }
    },
    handleNewMessage(message) {
      this.messages.push(message);
      this.scrollToBottom();
      this.markAsRead();
    },
    scrollToBottom() {
      try {
        this.$nextTick(() => {
          try {
            const container = this.$refs.messagesContainer;
            container.scrollTop = container.scrollHeight;
          } catch (e) {
            console.log(e);
          }
        });
      } catch (error) {
        console.log(error);
      }
    },
    async markAsRead() {
      await Chat.markAsRead(
        this.conversation.sender.id,
        this.$store.getters["users/getToken"]
      );
    },
  },
};
</script>
