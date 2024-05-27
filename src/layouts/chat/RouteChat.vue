<template>
  <div class="w-full flex justify-center items-center">
    <div
      class="rounded-3xl border border-black/50 w-2/3 flex flex-col"
      style="height: 40rem"
    >
      <div class="flex w-auto border-b border-black/50">
        <div
          class="border-r border-black/50 flex flex-col gap-1 h-full p-2 items-center"
        >
          <div class="text-xs font-semibold">Owner:</div>
          <img
            :src="
              owner && owner.profile_picture
                ? `${this.storageLink}/${owner.profile_picture}`
                : require('../../assets/images/default-user-pic.png')
            "
            alt=""
            class="rounded-full border aspect-square object-cover h-12 w-12"
          />
        </div>

        <div class="flex flex-col gap-1 h-full p-2">
          <div class="text-xs font-semibold">Members:</div>
          <div class="flex gap-1 h-full p-2 items-center overflow-x-auto">
            <img
              v-for="member in members"
              :key="member.id"
              :src="
                member && member.profile_picture
                  ? `${this.storageLink}/${member.profile_picture}`
                  : require('../../assets/images/default-user-pic.png')
              "
              alt=""
              class="rounded-full border aspect-square object-cover h-12 w-12"
            />
            <div v-if="members && members.length === 0" class="text-xs">
              No members yet
            </div>
          </div>
        </div>
      </div>

      <div
        ref="messagesContainer"
        class="h-full overflow-y-auto p-2 flex flex-col gap-1"
      >
        <GroupChatMessage
          v-for="message in messages"
          :key="message.id"
          :loggedInUserId="loggedInUserId"
          :message="message"
        />
      </div>

      <div class="w-full h-auto bg-black/50 rounded-b-3xl p-2">
        <div
          class="w-full h-auto flex items-center gap-1 flex-row justify-between flex-nowrap"
        >
          <input
            v-model="this.addMessage"
            class="w-full h-auto flex flex-nowrap focus:outline-none bg-white text-left p-3 pr-8 resize-none rounded-3xl auto-expand overflow-y-auto"
            placeholder="Write a message ..."
            type="text"
            @keydown.enter.prevent="sendMessage"
          />
          <div
            class="w-auto h-full flex flex-row md:gap-2 gap-1 items-center flex-nowrap"
          >
            <button
              :disabled="this.addMessage === ''"
              class="py-1 px-2 relative text-white h-fit rounded-3xl bg-black/50"
              @click="sendMessage"
            >
              <i class="fa-regular fa-paper-plane"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Chat from "../../services/chat.js";
import GroupChatMessage from "@/components/GroupChatMessage.vue";

export default {
  name: "RouteChat",
  components: { GroupChatMessage },
  props: ["route", "loggedInUserId"],
  beforeMount() {
    this.getMessages();
    this.getMembers();
  },
  created() {
    window.addEventListener("new-group-message", this.handleNewMessage);
  },
  beforeUnmount() {
    window.removeEventListener("new-group-message", this.handleNewMessage);
  },
  data() {
    return {
      members: [],
      owner: {},
      messages: [],
      storageLink: process.env.VUE_APP_STORAGE_URL,
      addMessage: "",
    };
  },
  methods: {
    async getMessages() {
      const response = await Chat.getMessages(
        this.route.group.id,
        "group",
        this.$store.getters["users/getToken"]
      );
      this.messages = response.messages;
      this.scrollToBottom();
    },
    async sendMessage() {
      if (this.addMessage === "") return;
      const index = this.messages.length;

      this.messages.push({
        content: this.addMessage,
        status: "sending",
        sender: this.$store.getters["users/getUser"],
        created_at: new Date().toISOString(),
      });
      this.scrollToBottom();

      const response = await Chat.sendGroupMessage(
        this.route.group.id,
        {
          message: this.addMessage,
          type: "text",
        },
        this.$store.getters["users/getToken"]
      );
      this.addMessage = "";

      if (response && this.messages[index])
        this.messages[index].status = "sent";
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
    async getMembers() {
      const response = await Chat.getMembers(
        this.route.group.id,
        this.$store.getters["users/getToken"]
      );
      this.members = response.members;
      this.owner = response.owner;
    },
    handleNewMessage(data) {
      var message = data.detail.message;
      message.sender = data.detail.other_user_id;
      if (this.loggedInUserId !== message.sender.id) {
        this.messages.push(message);
        this.scrollToBottom();
      }
    },
  },
};
</script>
