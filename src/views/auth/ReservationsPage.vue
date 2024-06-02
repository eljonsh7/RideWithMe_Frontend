<template>
  <div class="text-2xl font-semibold p-5">My Reservations</div>
  <div
    class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 mx-16 my-8 gap-14"
  >
    <RouteCard v-for="route in reservations" :key="route.id" :route="route" />
  </div>
</template>

<script>
import Reservation from "@/services/reservation";
import RouteCard from "@/components/ui/RouteCard.vue";

export default {
  name: "ReservationsPage",
  components: { RouteCard },
  beforeMount() {
    if (!sessionStorage.getItem("token")) this.$router.push("/login");
    this.getMyReservations();
  },
  data() {
    return {
      reservations: [],
    };
  },
  methods: {
    async getMyReservations() {
      const response = await Reservation.getSentReservations(
        this.$store.getters["users/getToken"]
      );
      if (response) this.reservations = response.routes;
    },
  },
};
</script>
