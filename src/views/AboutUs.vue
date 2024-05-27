<template>
  <div class="flex justify-center items-center w-full h-full">
    <form
      class="w-1/2 h-auto p-4 gap-4 border border-black/50 rounded-xl flex flex-col justify-center"
      @submit.prevent="submit"
    >
      <div>Add a suggestion/opinion to admins:</div>
      <select
        class="md:w-full w-full py-2 border border-gray-500 rounded-lg bg-white text-black text-center outline-none"
      >
        <option
          v-for="option in options"
          :key="option"
          :value="option"
          class="capitalize"
        >
          {{ option }}
        </option>
      </select>
      <textarea
        v-cloak
        v-model="this.content"
        class="overflow-y-auto resize-none border border-black/50 rounded-lg p-2 h-32"
        placeholder="Message"
        style="overflow-wrap: anywhere"
      />
      <div class="flex justify-end">
        <CustomButton :fill="true">Save</CustomButton>
      </div>
    </form>
  </div>
</template>

<script>
import Suggestion from "../services/suggestion.js";
import CustomButton from "@/components/CustomButton.vue";
import Toast from "@/utils/toast";

export default {
  name: "AboutUs",
  components: { CustomButton },
  data() {
    return {
      type: "enhancement",
      content: "",
      options: ["enhancement", "review", "comment", "bug", "error"],
    };
  },
  methods: {
    async submit() {
      if (this.content === "") {
        Toast.showWarning("Please fill out all fields.");
        return;
      }

      const data = {
        suggestion_type: this.type,
        suggestion_content: this.content,
      };
      this.type = "";
      this.content = "";
      const response = await Suggestion.makeSuggestion(
        data,
        this.$store.getters["users/getToken"]
      );
      if (response) {
        Toast.showSuccess("Suggestion added.");
        this.$router.push("/home");
      }
    },
  },
};
</script>
