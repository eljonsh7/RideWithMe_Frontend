<template>
  <custom-modal
    v-if="this.deleteUserModal"
    @closeModal="this.deleteUserModal = false"
  >
    <div class="flex flex-col gap-10">
      <div>Are you sure you want to delete this user?</div>
      <div class="flex w-full justify-between">
        <custom-button :fill="false" @click="this.deleteUserModal = false"
          >No
        </custom-button>
        <custom-button :fill="true">Yes</custom-button>
      </div>
    </div>
  </custom-modal>
  <div class="flex w-full">
    <div class="overflow-x-auto flex flex-col gap-4 w-full p-5">
      <table class="divide-y divide-gray-200 w-full border-2 border-black/30">
        <thead class="bg-gray-50">
          <tr>
            <th
              class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"
              scope="col"
            >
              Id
            </th>
            <th
              class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"
              scope="col"
            >
              First name
            </th>
            <th
              class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"
              scope="col"
            >
              Last name
            </th>
            <th
              class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"
              scope="col"
            >
              Email
            </th>
            <th
              class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"
              scope="col"
            >
              Reports number
            </th>
            <th
              class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"
              scope="col"
            >
              -
            </th>
          </tr>
        </thead>
        <tbody
          v-if="this.users.length > 0"
          class="bg-white divide-y divide-gray-200"
        >
          <tr
            v-for="user in users"
            :key="user"
            class="text-center text-black/50"
          >
            <td>{{ user.id }}</td>
            <td>{{ user.firstName }}</td>
            <td>{{ user.lastName }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.reportsNumber }}</td>
            <td class="flex justify-center">
              <trash-icon
                class="cursor-pointer"
                @click="this.deleteUserModal = true"
              ></trash-icon>
              <edit-icon
                class="cursor-pointer"
                @click="setSelectedUser(user)"
              ></edit-icon>
            </td>
          </tr>
        </tbody>
        <tbody v-else class="bg-white divide-y divide-gray-200">
          <tr class="text-center text-black/50">
            <td colspan="6">No users yet</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <custom-modal v-if="this.selectedUser" @closeModal="this.selectedUser = null">
    <h1>Edit user</h1>
    <div v-for="(key, index) in filteredKeys" :key="index">
      <p>{{ key }}</p>
      <input
        v-model="selectedUser[key]"
        :placeholder="key"
        class="w-96 outline-none border-2 border-black/50 rounded-lg py-2 px-3"
        type="text"
      />
    </div>
  </custom-modal>
</template>

<script>
import CustomModal from "../../layouts/CustomModal.vue";
import CustomButton from "../../components/CustomButton.vue";

import TrashIcon from "../../assets/svg/TrashIcon.vue";
import EditIcon from "../../assets/svg/EditIcon.vue";

export default {
  name: "AdminUsersPage",
  components: {
    CustomModal,
    CustomButton,
    TrashIcon,
    EditIcon,
  },
  computed: {
    filteredKeys() {
      return Object.keys(this.users[0]).filter(
        (key) => !["id", "reportsNumber"].includes(key)
      );
    },
  },
  data() {
    return {
      selectedUser: null,
      users: [
        {
          id: "000000000",
          firstName: "Eljon",
          lastName: "Shala",
          email: "eljonSh@gmail.com",
          reportsNumber: 0,
        },
        {
          id: "000000001",
          firstName: "Endrit",
          lastName: "Gjoka",
          email: "endritGj@gmail.com",
          reportsNumber: 0,
        },
      ],
      deleteUserModal: false,
    };
  },
  methods: {
    setSelectedUser(user) {
      this.selectedUser = user;
    },
  },
};
</script>
