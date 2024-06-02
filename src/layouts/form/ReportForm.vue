<template>
  <custom-modal class="text-left" @close-modal="this.$emit('close-form')">
    <div>
      <div>Reason</div>
      <select
        id="toRoute"
        v-model="this.reportReason"
        class="w-full border border-gray-500 p-2 rounded-lg bg-white text-black"
      >
        <option
          v-for="reasonTemp in this.reasons"
          :key="reasonTemp.id"
          :value="reasonTemp.id"
        >
          {{ reasonTemp.reason }}
        </option>
      </select>
    </div>
    <div>
      <div>Description</div>
      <textarea
        id="description"
        v-model="description"
        class="w-full h-40 border border-gray-500 p-2 rounded-lg bg-white text-black"
        cols="50"
        rows="4"
        style="resize: none"
      ></textarea>
    </div>
    <div class="flex justify-between">
      <custom-button @click="this.$emit('close-form')">Cancel</custom-button>
      <custom-button :fill="true" @click="submitReport">Submit</custom-button>
    </div>
  </custom-modal>
</template>

<script>
import CustomModal from "../ui/CustomModal.vue";
import CustomButton from "../../components/form/CustomButton.vue";
import Report from "../../services/report.js";

export default {
  name: "RouteForm",
  components: { CustomButton, CustomModal },
  props: ["user"],
  emits: ["close-form"],
  mounted() {
    this.getReasons();
  },
  data() {
    return {
      reasons: {},
      description: "",
      reportReason: 0,
    };
  },
  methods: {
    async getReasons() {
      this.reasons = (
        await Report.getReportReasons(sessionStorage.getItem("token"))
      ).reasons;
    },
    async submitReport() {
      if (this.reportReason == 0 || this.description == "") {
        return;
      }
      const form = {
        reason: this.reportReason,
        description: this.description,
      };
      await Report.addReport(form, this.user, sessionStorage.getItem("token"));
      this.$emit("submit-rating");
    },
  },
};
</script>
