<template>
  <div
    v-if="this.route"
    class="flex h-full md:flex-row flex-col gap-10 md:gap-0"
  >
    <div
      class="bg-gray-100 md:w-1/3 w-full md:h-full h-auto py-10 gap-2 flex flex-col border-r border-black/50 justify-center"
    >
      <RouteSeats
        :restrictedView="restrictedView"
        :seatByUser="seatByUser"
        :seatSelected="seatSelected"
        :seats="seats"
        :seatsTaken="seatsTaken"
        class="mx-auto aspect-square lg:w-80 lg:h-80 md:w-56 md:h-56 sm:w-80 w-80 h-80 rounded-3xl"
        @seat-selected="handleSeatSelected"
      ></RouteSeats>
      <div class="justify-center flex">
        <h1 class="inline text-2xl">
          {{ this.route.city_from ? route.city_from.name : "" }}
        </h1>
        <RightArrowIcon />
        <h1 class="inline text-2xl">
          {{ this.route.city_to ? route.city_to.name : "" }}
        </h1>
      </div>
      <div class="justify-center flex">
        <h1 class="inline text-2xl lg:text-2xl md:text-lg">
          Free seats: {{ seats - seatsTaken.length }}
        </h1>
      </div>
      <div class="justify-center flex">
        <h1 class="inline text-2xl lg:text-2xl md:text-lg">
          Price: {{ this.route.price }}€
        </h1>
      </div>
      <div v-if="seatByUser.status" class="justify-center flex">
        <h1 class="inline text-2xl lg:text-2xl md:text-lg">
          Your reservation status: {{ seatByUser.status }}
        </h1>
      </div>
      <div v-if="seatByUser.seat" class="justify-center flex">
        <h1 class="inline text-2xl lg:text-2xl md:text-lg">
          Your seat number: {{ seatByUser.seat }}
        </h1>
      </div>
      <div v-if="!restrictedView" class="justify-center flex">
        <button
          :disabled="seatSelected === 0"
          class="submit-btn"
          @click="reserveRoute()"
        >
          Reserve
        </button>
      </div>
      <div
        v-if="
          this.route &&
          this.route.takenSeatByUser &&
          this.route.takenSeatByUser.status === 'requested'
        "
        class="justify-center flex"
      >
        <button
          class="submit-btn"
          @click="cancelRequest(this.route.takenSeatByUser.id)"
        >
          Cancel request
        </button>
      </div>
    </div>
    <div v-if="showChat" class="md:w-2/3 w-full h-full gap-4 flex flex-col">
      <div class="w-full p-1 flex justify-center">
        <div
          v-if="this.loggedInUserId === this.route.driver.id"
          class="bg-black/10 flex gap-1 p-1 rounded-lg"
        >
          <div
            :class="{ 'bg-white': this.showRouteChat }"
            class="py-1 px-4 cursor-pointer rounded-lg"
            @click="this.showRouteChat = true"
          >
            Chat
          </div>
          <div
            :class="{ 'bg-white': !this.showRouteChat }"
            class="py-1 px-4 cursor-pointer rounded-lg"
            @click="this.showRouteChat = false"
          >
            Reservations
          </div>
        </div>
      </div>
      <RouteChat
        v-if="this.showRouteChat"
        :loggedInUserId="loggedInUserId"
        :route="this.route"
      />
      <RouteReservations
        v-else
        :allSeats="this.route.passengers_number"
        :route="this.route"
        :takenSeats="this.route.takenSeats.length"
      />
    </div>
  </div>
</template>

<script>
import Route from "../services/route.js";
import Reserve from "../services/reservation.js";
import RouteSeats from "../components/RouteSeats.vue";
import RightArrowIcon from "../components/icons/RightArrowIcon.vue";
import RouteChat from "@/layouts/chat/RouteChat.vue";
import RouteReservations from "@/layouts/reservations/RouteReservations.vue";

export default {
  name: "RouteDetails",
  props: ["routeId"],
  components: {
    RouteReservations,
    RouteChat,
    RouteSeats,
    RightArrowIcon,
  },
  data() {
    return {
      route: null,
      seats: 0,
      seatSelected: 0,
      seatsTaken: [],
      restrictedView: false,
      seatByUser: [],
      showRouteChat: true,
      loggedInUserId: this.$store.getters["users/getUser"].id,
      showChat: false,
    };
  },
  methods: {
    handleSeatSelected(seatNumber) {
      this.seatSelected = seatNumber;
    },
    async cancelRequest(reservationId) {
      const response = await Reserve.changeReservationStatus(
        reservationId,
        { status: "cancelled" },
        this.$store.getters["users/getToken"]
      );
      if (response) this.getRouteDetails();
    },
    async reserveRoute() {
      const reservation = {
        user_id: this.$store.getters["users/getUser"].id,
        route_id: this.route.id,
        status: "requested",
        seat: this.seatSelected,
      };
      try {
        const response = await Reserve.reserveRoute(
          reservation,
          this.$store.getters["users/getToken"]
        );
        if (response) this.getRouteDetails();
      } catch (error) {
        console.error("Error fetching route:", error);
      }
    },
    async getRouteDetails() {
      try {
        this.route = await Route.getRouteByID(
          this.routeId,
          this.$store.getters["users/getToken"]
        );
        this.showChat =
          (this.route.takenSeatByUser &&
            this.route.takenSeatByUser.status === "accepted") ||
          this.route.driver.id === this.loggedInUserId;
        this.seats = this.route.passengers_number;
        this.seatsTaken = this.route.takenSeats;
        try {
          this.restrictedView =
            this.route.driver.id === this.$store.getters["users/getUser"].id
              ? true
              : this.route.takenSeatByUser !== null;
        } catch (e) {
          return false;
        }
        if (this.route.takenSeatByUser) {
          this.seatByUser = this.route.takenSeatByUser;
        }
      } catch (error) {
        console.error("Error fetching route:", error);
      }
    },
  },
  beforeMount() {
    this.getRouteDetails();
  },
};
</script>

<style scoped>
.submit-btn {
  background-color: #808080;
  color: white;
  border: none;
  border-radius: 25px;
  padding: 10px 30px;
  font-size: 16px;
  cursor: pointer;
  outline: none;
  display: inline-block;
  text-align: center;
}

.submit-btn:hover {
  background-color: #696969;
}

.submit-btn:active {
  background-color: #505050;
}

.submit-btn:disabled {
  background-color: #ced6e0;
  cursor: default;
}
</style>
