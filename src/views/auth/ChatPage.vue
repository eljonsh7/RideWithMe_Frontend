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
        <ChatConversation
          v-for="(conversation, index) in this.conversations"
          :key="conversation"
          :class="{
            'bg-gray-200': this.selectedConversation === conversation,
          }"
          :conversation="conversation"
          @click="chooseConversation(index)"
        />
      </div>
    </div>
    <div class="bg-black/20 w-3/4 h-full flex flex-col">
      <div v-if="this.selectedConversation" class="h-3/4">
        <div
          class="w-full h-28 px-3 gap-3 flex justify-between items-center bg-white border-b border-black/20"
        >
          <div class="flex items-center gap-3 w-full">
            <div class="w-16 flex items-center justify-center h-16">
              <img
                :src="selectedConversationImage"
                alt="."
                class="w-12 h-12 rounded-full object-cover cursor-pointer border border-black/20"
                @click="
                  this.$router.push(
                    `/profile/${selectedConversation.sender.id}`
                  )
                "
              />
            </div>
            <div
              class="font-semibold text-base w-full cursor-pointer"
              @click="
                this.$router.push(`/profile/${selectedConversation.sender.id}`)
              "
            >
              {{
                `${selectedConversation.sender.first_name} ${selectedConversation.sender.last_name}`
              }}
            </div>
          </div>
          <div class="w-5 h-full flex items-center">
            <TrashIcon
              class="cursor-pointer"
              @click="this.deleteChatModal = true"
            />
          </div>
        </div>
        <ChatMessages
          :conversation="selectedConversation"
          :newMessage="newMessage"
          :userId="userId"
          @change-last-message="changeLastMessage"
        />
      </div>
      <div v-else class="w-full h-full flex justify-center items-center">
        <div class="text-black/50 text-sm">No conversation selected!</div>
      </div>
    </div>
  </div>
  <ConfirmBox
    v-if="deleteChatModal"
    @close-modal="this.deleteChatModal = false"
    @confirm-action="deleteConversation"
  >
    Are you sure you want to delete this conversation?
  </ConfirmBox>
</template>

<script>
import Chat from "../../services/chat.js";
import ChatMessages from "../../layouts/chat/ChatMessages.vue";
import ChatConversation from "../../layouts/chat/ChatConversation.vue";
import TrashIcon from "@/components/icons/TrashIcon.vue";
import ConfirmBox from "@/layouts/ui/ConfirmBox.vue";

export default {
  name: "ChatPage",
  components: { ConfirmBox, TrashIcon, ChatConversation, ChatMessages },
  data() {
    return {
      conversations: [],
      selectedConversation: null,
      newMessage: null,
      userId: this.$store.getters["users/getUser"].id,
      deleteChatModal: false,
    };
  },
  beforeMount() {
    if (sessionStorage.getItem("token")) this.getChats();
    else this.$router.push("/");
  },
  created() {
    window.addEventListener("new-private-message", this.handleNewMessage);
  },
  beforeUnmount() {
    window.removeEventListener("new-private-message", this.handleNewMessage);
  },
  computed: {
    selectedConversationImage() {
      return this.selectedConversation.sender.profile_picture
        ? `${process.env.VUE_APP_STORAGE_URL}/${this.selectedConversation.sender.profile_picture}`
        : require("../../assets/images/default-user-pic.png");
    },
  },
  methods: {
    async getChats() {
      const response = await Chat.getChats(
        this.$store.getters["users/getToken"]
      );
      this.conversations = response.conversations;
    },
    changeLastMessage(message) {
      this.selectedConversation.last_message.content = message;
    },
    chooseConversation(index) {
      this.conversations[index].unread_messages = 0;
      this.selectedConversation = this.conversations[index];
    },
    async deleteConversation() {
      const response = await Chat.deleteMessages(
        this.selectedConversation.sender.id,
        this.$store.getters["users/getToken"]
      );
      if (response) {
        const index = this.conversations.findIndex((item) => {
          return item.sender.id === this.selectedConversation.sender.id;
        });
        this.selectedConversation = null;

        if (index > -1) {
          this.conversations.splice(index, 1);
        }
      }
      this.deleteChatModal = false;
    },
    handleNewMessage(message) {
      console.log(message);
      if (message.detail && message.detail.message) {
        if (message.detail.message.user_id !== this.userId) {
          if (
            this.selectedConversation
              ? this.selectedConversation.sender.id ===
                message.detail.message.user_id
              : false
          )
            this.newMessage = message.detail.message;
          else {
            const index = this.conversations.findIndex((item) => {
              return item.sender.id === message.detail.other_user_id;
            });

            console.log(this.conversations[index]);
            if (index >= 0) {
              this.conversations[index].last_message.content =
                message.detail.message.content;
              this.conversations[index].unread_messages++;
            }
          }
        }
      }
    },
  },
};
</script>
