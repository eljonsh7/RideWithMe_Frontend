<template>
  <tr class="text-center text-black/50 hover:bg-gray-200 cursor-pointer">
    <td class="py-2">{{ fullName }}</td>
    <td class="py-2">{{ this.user.email }}</td>
    <td class="py-2">{{ this.user.role }}</td>
    <td class="py-2">{{ this.user.reports_number || 0 }}</td>
    <td class="py-2 flex justify-center">
      <TrashIcon class="cursor-pointer" @click="this.deleteUserModal = true" />
      <BlockIcon
        :class="{ 'bg-gray-500 text-white': this.user.is_banned }"
        class="cursor-pointer rounded-full"
        @click="this.banUserModal = true"
      />
    </td>
  </tr>
  <ConfirmBox
    v-if="this.deleteUserModal"
    @close-modal="this.deleteUserModal = false"
    @confirm-action="deleteUser"
  >
    Are you sure you want to delete user: {{ fullName }}?
  </ConfirmBox>
  <ConfirmBox
    v-if="this.banUserModal"
    @close-modal="this.banUserModal = false"
    @confirm-action="changeBanStatus"
  >
    Are you sure you want to
    {{
      this.user.is_banned
        ? `remove ban of ${fullName}?`
        : `ban ${fullName} for a month?`
    }}
  </ConfirmBox>
</template>

<script>
import TrashIcon from "../../components/icons/TrashIcon.vue";
import BlockIcon from "../../components/icons/BlockIcon.vue";
import ConfirmBox from "../../layouts/ui/ConfirmBox.vue";

import User from "../services/user.js";

export default {
  name: "AdminUserTableRow",
  components: { BlockIcon, ConfirmBox, TrashIcon },
  props: ["user", "index"],
  emits: ["delete-user", "user-ban-status-changed"],
  computed: {
    fullName() {
      return `${this.user.first_name} ${this.user.last_name}`;
    },
  },
  data() {
    return {
      deleteUserModal: false,
      banUserModal: false,
    };
  },
  methods: {
    deleteUser() {
      const response = User.deleteUser(
        this.user.id,
        this.$store.getters["users/getToken"]
      );
      if (response) this.$emit("delete-user", this.index);
    },
    changeBanStatus() {
      this.user.is_banned ? this.removeUserBan() : this.banUser();
    },
    banUser() {
      const response = User.banUser(
        this.user.id,
        this.$store.getters["users/getToken"]
      );
      if (response) this.$emit("user-ban-status-changed", this.index, true);

      this.banUserModal = false;
    },
    removeUserBan() {
      const response = User.removeUserBan(
        this.user.id,
        this.$store.getters["users/getToken"]
      );
      if (response) this.$emit("user-ban-status-changed", this.index, false);

      this.banUserModal = false;
    },
  },
};
</script>
