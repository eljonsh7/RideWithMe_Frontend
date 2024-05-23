<template>
  <div class="h-full">
    <div
      ref="messagesContainer"
      class="h-full flex flex-col gap-1 p-1 overflow-y-scroll"
      style="scrollbar-width: none"
    >
      <chat-message
        v-for="message in this.messages"
        :key="message.id"
        :loggedInUserId="userId"
        :message="message"
      >
        {{ message.content }}
      </chat-message>
    </div>
    <div
      class="w-full h-auto bottom-0 bg-black/30 flex justify-center content-center flex-wrap"
    >
      <div
        class="w-full h-auto flex items-center md:m-2 gap-1 m-1 flex-row justify-between flex-nowrap"
      >
        <input
          v-model="this.newMessage"
          class="w-full h-auto flex flex-nowrap focus:outline-none bg-white text-left p-3 pr-8 resize-none rounded-lg auto-expand overflow-y-auto"
          placeholder="Write message ..."
          type="text"
          @keydown.enter.prevent="sendMessage"
        />
        <div
          class="w-auto h-full pt-2 flex flex-row md:gap-2 gap-1 justify-end flex-nowrap"
        >
          <button
            :disabled="this.newMessage === ''"
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
import ChatMessage from "../../components/ChatMessage.vue";

export default {
  name: "ChatMessages",
  components: { ChatMessage },
  props: ["conversation"],
  watch: {
    conversation() {
      this.getMessages();
    },
  },
  created() {
    window.addEventListener("new-message", this.handleNewMessage);
  },
  beforeUnmount() {
    window.removeEventListener("new-message", this.handleNewMessage);
  },
  beforeMount() {
    this.getMessages();
  },
  data() {
    return {
      messages: [],
      newMessage: "",
      userId: sessionStorage.getItem("userId"),
    };
  },
  methods: {
    async getMessages() {
      const response = await Chat.getMessages(
        this.conversation.sender.id,
        "private",
        sessionStorage.getItem("token")
      );
      console.log(response);
      this.messages = response.messages;
    },
    async sendMessage() {
      const object = {
        message: this.newMessage,
        type: "text",
      };

      var index = this.messages.length;

      this.messages.push({
        content: object.message,
        status: "sending",
        user_id: this.userId,
      });

      this.newMessage = "";

      this.scrollToBottom();

      const response = await Chat.sendMessage(
        this.conversation.sender.id,
        sessionStorage.getItem("token"),
        object
      );

      if (response) this.messages[index].status = "sent";
    },
    handleNewMessage(detail) {
      console.log(detail);
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
  },
};
</script>
