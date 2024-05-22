<template>
  <div
    class="flex p-3 border-b border-black/20 items-center w-full hover:bg-gray-50 bg-gray-200 cursor-pointer"
  >
    <div class="w-16 flex items-center justify-center h-16">
      <img
        :src="
          conversation.sender.profile_picture ||
          require('../../assets/images/default-user-pic.png')
        "
        alt="."
        class="w-12 h-12 rounded-full object-cover border border-black/20"
      />
    </div>
    <div class="flex justify-between w-full">
      <div class="flex flex-col p-2">
        <div class="font-semibold text-base w-full truncate">
          {{
            `${conversation.sender.first_name} ${conversation.sender.last_name}`
          }}
        </div>
        <div class="text-sm text-gray-600 truncate w-full">
          {{
            conversation.last_message ? conversation.last_message.content : ""
          }}
        </div>
      </div>
      <div
        v-if="conversation.sender.unread_messages > 0"
        class="flex items-center"
      >
        <div
          class="w-5 h-5 text-sm text-white bg-black rounded-full justify-center items-center flex"
        >
          {{ conversation.sender.unread_messages }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ChatConversations",
  props: ["conversation"],
};
</script>
