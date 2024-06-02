<template>
  <CustomModal @close-modal="this.$emit('close-modal')">
    <div class="px-4 mb-2 font-semibold">
      <CustomInput v-model="searchValue" autofocus placeholder="Search User" />
    </div>

    <div class="overflow-y-auto gap-y-1 flex flex-col" style="height: 400px">
      <div v-if="this.users.length > 0">
        <div
          v-for="user in this.users"
          :key="user.id"
          class="hover:bg-black/10 py-2 cursor-pointer px-4 rounded border flex gap-2 items-center"
          @click="
            this.$router.push(`/profile/${user.id}`);
            this.$emit('close-modal');
          "
        >
          <div>
            <img
              :src="
                user.profile_picture
                  ? `${storageLink}/${user.profile_picture}`
                  : defaulProfilePicture
              "
              alt=""
              class="rounded-full w-8 h-8 border object-cover"
            />
          </div>
          <div>
            {{ `${user.first_name} ${user.last_name}` }}
          </div>
        </div>
      </div>
      <div v-else class="text-xs text-black/50 text-center">No users</div>
    </div>
  </CustomModal>
</template>

<script>
import CustomModal from "@/layouts/ui/CustomModal.vue";
import CustomInput from "@/components/form/CustomInput.vue";
import User from "@/services/user";

export default {
  name: "SearchUsersModal",
  components: { CustomInput, CustomModal },
  watch: {
    searchValue(newValue) {
      this.getUsers(newValue);
    },
  },
  data() {
    return {
      searchValue: "",
      users: [],
      storageLink: process.env.VUE_APP_STORAGE_URL,
      defaulProfilePicture: require("../../assets/images/default-user-pic.png"),
    };
  },
  methods: {
    async getUsers(value = "") {
      if (value !== "") {
        const response = await User.searchUsers(
          value,
          this.$store.getters["users/getToken"]
        );
        this.users = response ? response.users : [];
      } else this.users = [];
    },
  },
};
</script>
