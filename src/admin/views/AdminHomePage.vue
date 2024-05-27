<template>
  <div class="flex flex-col gap-3 p-5 w-full">
    <div class="flex justify-center text-3xl font-extrabold">Suggestions</div>
    <div class="flex w-full">
      <div class="flex justify-center items-center w-full flex-wrap">
        <table
          class="divide-x divide-y divide-gray-200 w-full border rounded-xl"
        >
          <thead class="bg-gray-50 border rounded-xl">
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
            v-if="this.suggestions.length > 0"
            class="bg-white divide-y divide-gray-200"
          >
            <AdminSuggestionTableRow
              v-for="(suggestion, index) in suggestions"
              :key="suggestion"
              :index="index"
              :suggestion="suggestion"
              @suggestion-deleted="suggestionDeleted"
            />
          </tbody>
          <tbody v-else class="bg-white divide-y divide-gray-200">
            <tr class="text-center text-black/50">
              <td colspan="5">No suggestion yet</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import AdminSuggestionTableRow from "@/admin/components/AdminSuggestionTableRow.vue";

import Suggestion from "@/admin/services/suggestion";

export default {
  name: "AdminHomePage",
  components: { AdminSuggestionTableRow },
  data() {
    return {
      isModalOpen: false,
      columns: ["Full name", "Type", "Content"],
      suggestions: [],
    };
  },
  beforeMount() {
    if (
      !this.$store.getters["users/getUser"] ||
      this.$store.getters["users/getUser"].is_admin === 0
    )
      this.$router.push("/");
    this.getSuggestions();
  },
  methods: {
    suggestionDeleted(index) {
      this.suggestions.splice(index, 1);
    },
    async getSuggestions() {
      const response = await Suggestion.getSuggestions(
        this.$store.getters["users/getToken"]
      );
      if (response) this.suggestions = response.suggestions;
    },
  },
};
</script>
