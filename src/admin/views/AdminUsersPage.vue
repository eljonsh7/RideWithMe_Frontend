<template>
  <div class="flex w-full">
    <div class="overflow-x-auto flex flex-col gap-4 w-full p-5">
      <table class="divide-y divide-gray-200 w-full border-black/30">
        <thead class="bg-gray-50 border">
          <tr>
            <th
              v-for="column in this.columns"
              :key="column"
              class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-200"
              scope="col"
            >
              {{ column }}
            </th>
          </tr>
        </thead>
        <tbody
          v-if="this.users.length > 0"
          class="bg-white divide-y divide-gray-200"
        >
          <admin-user-table-row
            v-for="(user, index) in users"
            :key="user"
            :index="index"
            :user="user"
            @delete-user="deleteUser"
            @user-ban-status-changed="changeUserBanStatus"
          >
          </admin-user-table-row>
        </tbody>
        <tbody v-else class="bg-white divide-y divide-gray-200">
          <tr class="text-center text-black/50">
            <td colspan="5">No users yet</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import AdminUserTableRow from "../components/AdminUserTableRow.vue";

import User from "../services/user.js";

export default {
  name: "AdminUsersPage",
  components: {
    AdminUserTableRow,
  },
  beforeMount() {
    this.getUsers();
  },
  data() {
    return {
      selectedUser: null,
      columns: ["Full name", "Email", "Role", "Reports number", "-"],
      users: [],
      deleteUserModal: false,
      sortedColumn: "",
      desc: false,
    };
  },
  methods: {
    async getUsers() {
      const users = await User.getUsers(sessionStorage.getItem("token"));
      if (users) this.users = users.data.users;
    },
    deleteUser(index) {
      this.users.splice(index, 1);
    },
    changeUserBanStatus(index, status) {
      this.users[index].is_banned = status;
    },
  },
};
</script>
