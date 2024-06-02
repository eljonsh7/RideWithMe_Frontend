<template>
  <CustomModal @close-modal="this.$emit('close-message-modal')">
    <div>Start a conversation here:</div>
    <CustomInput
      v-model="message"
      :placeholder="`Message ${this.user.first_name} ...`"
      @keydown.enter.prevent="sendMessage"
    />
  </CustomModal>
</template>

<script>
import CustomModal from "@/layouts/ui/CustomModal.vue";
import CustomInput from "@/components/form/CustomInput.vue";
import Chat from "@/services/chat";

export default {
  name: "MessageModal",
  components: { CustomInput, CustomModal },
  props: ["user"],
  emits: ["close-message-modal"],
  data() {
    return {
      message: "",
    };
  },
  methods: {
    sendMessage() {
      if (this.message !== "") {
        const response = Chat.sendMessage(
          this.user.id,
          {
            message: this.message,
            type: "text",
          },
          this.$store.getters["users/getToken"]
        );
        if (response) this.$router.push("/chat");
      }
    },
  },
};
</script>
