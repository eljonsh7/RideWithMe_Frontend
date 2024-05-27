<template>
  <div class="flex flex-col gap-2 p-4">
    <ReservationCard
      v-for="(reservation, index) in reservations"
      :key="reservation.id"
      :allSeats="allSeats"
      :index="index"
      :reservation="reservation"
      :takenSeats="takenSeats + takenSeatsAfter"
      @change-reservation-status="changeReservationStatus"
    />
  </div>
</template>

<script>
import Reservation from "@/services/reservation";
import ReservationCard from "@/components/ReservationCard.vue";

export default {
  name: "RouteReservations",
  props: ["takenSeats", "allSeats"],
  components: { ReservationCard },
  beforeMount() {
    this.getReservations();
  },
  data() {
    return {
      reservations: [],
      takenSeatsAfter: 0,
    };
  },
  methods: {
    async getReservations() {
      const response = await Reservation.getRouteReservations(
        this.$route.params.routeId,
        this.$store.getters["users/getToken"]
      );

      console.log(response);
      this.reservations = response.reservations;
    },
    changeReservationStatus(object) {
      this.reservations[object.index].status = object.status;
      if (object.status === "accepted") this.takenSeatsAfter++;
    },
  },
};
</script>
