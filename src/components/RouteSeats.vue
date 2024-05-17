<template>
    <div class="p-4 seatContainer flex flex-wrap items-center justify-center">
        <div class="flex justify-center" v-if="seats > 4">
            <CarSeat v-for="seatIndex in seats - 4" :key="seatIndex+4" class="lg:w-12 md:w-8 carSeat" :class="{ 'mr-4': seatIndex !== seats-4, 'lg:ml-4 lg:mr-20 md:ml-1 md:mr-12 ml-2 mr-24': seats-4 === 1, 'ml-1 md:ml-2': seatIndex === 1 && seats - 4 === 2,'takenSeat':this.seatsTaken.includes(seatIndex + 4) }" :color="setSeatColor(seatIndex + 4)" :hoverColor="setHoverColor(seatIndex + 4)" :seatNumber="seatIndex + 4" @seat-clicked="handleSeatClick"></CarSeat>
        </div>
        <div class="flex justify-center">
            <CarSeat v-for="seatIndex in 3" :key="seatIndex" class="lg:w-12 md:w-8 carSeat" :class="{ 'mr-4 md:mr-4': seatIndex !== 3,'takenSeat':this.seatsTaken.includes(seatIndex+1) }" :color="setSeatColor(seatIndex+1)" :hoverColor="setHoverColor(seatIndex +1)" :seatNumber="seatIndex + 1" @seat-clicked="handleSeatClick"></CarSeat>
        </div>
        <div class="flex justify-center" >
            <CarSeat v-if="seats != 3" class="lg:w-12 md:w-8 mx-4 carSeat" :class="{'takenSeat':this.seatsTaken.includes(1)}" :color="setSeatColor(1)" :hoverColor="setHoverColor(1)" :seatNumber="1" @seat-clicked="handleSeatClick" :disabled = "seatsTaken.includes(1)"></CarSeat>
            <CarSeat class="lg:w-12 md:w-8 mr-4" :class="{ 'ml-24 md:ml-32': seats < 4 }" color="red"></CarSeat>
        </div>
    </div>
</template>


<script>
import CarSeat from ".//icons/CarSeat.vue";
export default {
  name: "RouteSeats",
  props: ["seats","seatsTaken"],
  components:{
    CarSeat
  },
  data(){
    return{
        seatColor:"black",
        seatColorHover:"#4b4b4b",
        seatColorSelected:"#d1ccc0",
        seatColorTaken:"#84817a",
        seatSelected:0,
    }
  },
  methods: {
    handleSeatClick(seatNumber) {
        if(!this.seatsTaken.includes(seatNumber)){
            seatNumber == this.seatSelected ?this.seatSelected = 0:this.seatSelected = seatNumber;
        }
        this.$emit('seat-selected',this.seatSelected);
    },
    setSeatColor(seatNumber){
        return this.seatSelected !== seatNumber?this.seatsTaken.includes(seatNumber) ?this.seatColorTaken :this.seatColor : this.seatColorSelected;
    },
    setHoverColor(seatNumber){
        return this.seatsTaken.includes(seatNumber)?null:this.seatColorHover;
    }
  }
};
</script>

<style scoped>
    .carSeat:not(.takenSeat):hover {
        cursor: pointer;
    }
    .seatContainer{
        background-color: white;
    }
</style>