<template>
  <div
    class="p-4 seatContainer flex flex-wrap items-center justify-center border border-black/50"
  >
    <div v-if="seats > 4" class="flex justify-center">
      <CarSeat
        v-for="seatIndex in seats - 4"
        :key="seatIndex + 4"
        :class="{
          'mr-4': seatIndex !== seats - 4,
          'lg:ml-4 lg:mr-20 md:ml-1 md:mr-12 ml-2 mr-24': seats - 4 === 1,
          'ml-1 md:ml-2': seatIndex === 1 && seats - 4 === 2,
          takenSeat:
            this.seatsTaken.includes(seatIndex + 4) || this.restrictedView,
        }"
        :color="setSeatColor(seatIndex + 4)"
        :hoverColor="setHoverColor(seatIndex + 4)"
        :seatNumber="seatIndex + 4"
        class="lg:w-12 md:w-8 carSeat"
        @seat-clicked="handleSeatClick"
      />
    </div>
    <div class="flex justify-center">
      <CarSeat
        v-for="seatIndex in 3"
        :key="seatIndex"
        :class="{
          'mr-4 md:mr-4': seatIndex !== 3,
          takenSeat:
            this.seatsTaken.includes(seatIndex + 1) || this.restrictedView,
        }"
        :color="setSeatColor(seatIndex + 1)"
        :hoverColor="setHoverColor(seatIndex + 1)"
        :seatNumber="seatIndex + 1"
        class="lg:w-12 md:w-8 carSeat"
        @seat-clicked="handleSeatClick"
      />
    </div>
    <div class="flex justify-center">
      <CarSeat
        v-if="seats !== 3"
        :class="{
          takenSeat: this.seatsTaken.includes(1) || this.restrictedView,
        }"
        :color="setSeatColor(1)"
        :disabled="seatsTaken.includes(1)"
        :hoverColor="setHoverColor(1)"
        :seatNumber="1"
        class="lg:w-12 md:w-8 mx-4 carSeat"
        @seat-clicked="handleSeatClick"
      />
      <CarSeat
        :class="{ 'ml-24 md:ml-32': seats < 4 }"
        class="lg:w-12 md:w-8 mr-4"
        color="red"
      />
    </div>
  </div>
</template>

<script>
import CarSeat from ".//icons/CarSeat.vue";

export default {
  name: "RouteSeats",
  props: ["seats", "seatsTaken", "restrictedView", "seatByUser"],
  components: {
    CarSeat,
  },
  data() {
    return {
      seatColor: "#44bd32",
      seatColorHover: "#4b4b4b",
      seatColorSelected: "#d1ccc0",
      seatColorTaken: "black",
      seatColorPending: "#84817a",
      seatColorTakenByUser: "#227093",
      seatSelected: 0,
    };
  },
  methods: {
    handleSeatClick(seatNumber) {
      if (!this.seatsTaken.includes(seatNumber) && !this.restrictedView) {
        seatNumber === this.seatSelected
          ? (this.seatSelected = 0)
          : (this.seatSelected = seatNumber);
      }
      this.$emit("seat-selected", this.seatSelected);
    },
    setSeatColor(seatNumber) {
      if (this.seatSelected !== seatNumber) {
        if (this.seatByUser.seat === seatNumber) {
          return this.seatByUser.status === "Approved"
            ? this.seatColorTakenByUser
            : this.seatColorPending;
        }
        if (this.seatsTaken.includes(seatNumber)) {
          return this.seatColorTaken;
        }
        return this.seatColor;
      }
      return this.seatColorSelected;
    },
    setHoverColor(seatNumber) {
      return this.seatsTaken.includes(seatNumber) || this.restrictedView
        ? null
        : this.seatColorHover;
    },
  },
};
</script>

<style scoped>
.carSeat:not(.takenSeat):hover {
  cursor: pointer;
}

.seatContainer {
  background-color: white;
}
</style>
