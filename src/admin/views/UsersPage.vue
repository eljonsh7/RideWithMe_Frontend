<template>
  <nav-bar></nav-bar>
  <div class="overflow-x-auto">
    <table class="divide-y divide-gray-200">
      <thead class="bg-gray-50">
        <tr>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            scope="col"
          >
            Id
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            scope="col"
          >
            First name
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            scope="col"
          >
            Last name
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            scope="col"
          >
            Email
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            scope="col"
          >
            Reports number
          </th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <!-- Your table rows will go here -->
      </tbody>
    </table>
  </div>
</template>

<script>
import NavBar from "../layouts/NavBar.vue";

export default {
  name: "UsersPage",
  components: {
    NavBar,
  },
};
</script>
