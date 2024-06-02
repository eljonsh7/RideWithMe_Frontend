<template>
  <tr class="text-center text-black/50 hover:bg-gray-200 cursor-pointer">
    <td class="py-2">{{ fullName }}</td>
    <td class="py-2">{{ this.suggestion.type }}</td>
    <td class="py-2">{{ this.suggestion.content }}</td>
    <td class="py-2 flex justify-center">
      <TrashIcon
        class="cursor-pointer"
        @click="this.deleteSuggestionModal = true"
      />
    </td>
  </tr>
  <ConfirmBox
    v-if="this.deleteSuggestionModal"
    @close-modal="this.deleteSuggestionModal = false"
    @confirm-action="deleteSuggestion"
  >
    Are you sure
  </ConfirmBox>
</template>

<script>
import TrashIcon from "@/components/icons/TrashIcon.vue";
import ConfirmBox from "@/layouts/ui/ConfirmBox.vue";
import Suggestion from "@/admin/services/suggestion";

export default {
  name: "AdminSuggestionTableRow",
  components: { ConfirmBox, TrashIcon },
  props: ["suggestion", "index"],
  emits: ["suggestion-deleted"],
  data() {
    return {
      deleteSuggestionModal: false,
    };
  },
  computed: {
    fullName() {
      return `${this.suggestion.user.first_name} ${this.suggestion.user.last_name}`;
    },
  },
  methods: {
    deleteSuggestion() {
      const response = Suggestion.deleteSuggestion(
        this.suggestion.id,
        this.$store.getters["users/getToken"]
      );
      if (response) this.$emit("suggestion-deleted", this.index);
    },
  },
};
</script>
