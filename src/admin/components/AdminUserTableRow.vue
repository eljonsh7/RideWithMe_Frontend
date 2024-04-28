<template>
  <tr class="text-center text-black/50">
    <td>{{ user.first_name }}</td>
    <td>{{ user.last_name }}</td>
    <td>{{ user.email }}</td>
    <td>{{ user.role }}</td>
    <td>{{ user.reports_number || 0 }}</td>
    <td class="flex justify-center">
      <trash-icon
        class="cursor-pointer"
        @click="this.deleteUserModal = true"
      ></trash-icon>
      <edit-icon class="cursor-pointer"></edit-icon>
      <block-icon
        class="cursor-pointer"
        @click="this.banUserModal = true"
      ></block-icon>
    </td>
  </tr>
  <confirm-box
    v-if="this.deleteUserModal"
    @close-modal="this.deleteUserModal = false"
    @confirm-action="deleteUser"
  >
    Are you sure you want to delete user: {{ user.firstName }}
    {{ user.lastName }}?
  </confirm-box>
  <confirm-box
    v-if="this.banUserModal"
    @close-modal="this.banUserModal = false"
    @confirm-action="banUser"
  >
    Are you sure you want to ban user: {{ user.firstName }}
    {{ user.lastName }} for a week?
  </confirm-box>
</template>

<script>
import EditIcon from "../../components/icons/EditIcon.vue";
import TrashIcon from "../../components/icons/TrashIcon.vue";
import BlockIcon from "../../components/icons/BlockIcon.vue";
import ConfirmBox from "../../layouts/ConfirmBox.vue";

import User from "../services/user.js";

export default {
  name: "AdminUserTableRow",
  components: { BlockIcon, ConfirmBox, TrashIcon, EditIcon },
  props: ["user", "index"],
  emits: ["delete-user"],
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
        sessionStorage.getItem("token")
      );
      if (response) this.$emit("delete-user", this.index);
    },
    banUser() {
      User.banUser(this.user.id, sessionStorage.getItem("token"));
    },
  },
};
</script>
