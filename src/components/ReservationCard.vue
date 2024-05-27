<template>
  <div class="rounded-lg bg-black p-2 w-full text-white flex justify-between">
    <div class="flex items-center gap-2">
      <img
        :src="
          reservation.user.profile_picture
            ? `${this.storageLink}/${reservation.user.profile_picture}`
            : require('../assets/images/default-user-pic.png')
        "
        alt=""
        class="w-14 h-14 rounded-full border border-white"
      />
      <div class="flex flex-col gap-1">
        <div>
          {{ `${reservation.user.first_name} ${reservation.user.last_name}` }}
        </div>
        <div class="text-sm">Seat number: {{ reservation.seat }}</div>
      </div>
    </div>
    <div
      v-if="!blockButtons && reservation.status === 'requested'"
      class="flex gap-1"
    >
      <CustomButton @click="doAction('accepted')">Accept</CustomButton>
      <CustomButton @click="doAction('rejected')">Reject</CustomButton>
    </div>
    <div v-else class="capitalize text-xs items-center content-center flex">
      {{ reservation.status }}
    </div>
  </div>
</template>

<script>
import CustomButton from "@/components/CustomButton.vue";
import Reservation from "@/services/reservation";

export default {
  name: "ReservationCard",
  components: { CustomButton },
  props: ["reservation", "index", "takenSeats", "allSeats"],
  emits: ["change-reservation-status"],
  data() {
    return {
      storageLink: process.env.VUE_APP_STORAGE_URL,
      blockButtons: false,
    };
  },
  watch: {
    blockButtons() {
      return this.takenSeats >= this.allSeats;
    },
  },
  methods: {
    async doAction(status) {
      const response = await Reservation.changeReservationStatus(
        this.reservation.id,
        { status },
        this.$store.getters["users/getToken"]
      );
      if (response) {
        this.$emit("change-reservation-status", { index: this.index, status });
      }
    },
  },
};
</script>
