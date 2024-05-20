<template>
    <div class="grid grid-cols-3 h-full">
        <div class="bg-gray-100 col-span-3 lg:col-span-1 md:col-span-1 sm:col-span-3 h-full">
            <RouteSeats :seats="seats" :seatsTaken="seatsTaken" :seatSelected="seatSelected" @seat-selected="handleSeatSelected" class="mx-auto my-16 aspect-square lg:w-80 lg:h-80 md:w-56 md:h-56 sm:w-80 w-80 h-80 rounded-3xl" :restrictedView="restrictedView" :seatByUser="seatByUser"></RouteSeats>
            <div class="justify-center flex">
                <h1 class="inline text-2xl">{{ this.route.city_from ? route.city_from.name: ""}}</h1>
                <RightArrowIcon></RightArrowIcon>
                <h1 class="inline text-2xl">{{ this.route.city_to ? route.city_to.name: ""}}</h1>
            </div>
            <div class="justify-center flex">
                <h1 class="inline text-2xl lg:text-2xl md:text-lg">Free seats: {{ seats - seatsTaken.length }}</h1>
            </div>
            <div class="justify-center flex">
                <h1 class="inline text-2xl lg:text-2xl md:text-lg">Price: {{ route.price }}€</h1>
            </div>
            <div class="justify-center flex" v-if="seatByUser.status">
                <h1 class="inline text-2xl lg:text-2xl md:text-lg">Your reservation status: {{ seatByUser.status }}</h1>
            </div>
            <div class="justify-center flex" v-if="seatByUser.seat">
                <h1 class="inline text-2xl lg:text-2xl md:text-lg">Your seat number: {{ seatByUser.seat }}</h1>
            </div>
            <div class="justify-center flex" v-if="!restrictedView">
                <button class="submit-btn" :disabled="seatSelected == 0" @click="reserveRoute()">Reserve</button>
            </div>
        </div>
        <div class="chat col-span-3 lg:col-span-2 md:col-span-2 sm:col-span-3" >
            <h1>TEST</h1>
        </div>
    </div>
  </template>
  
  <script>
  import Route from "../services/route.js";
  import Reserve from "../services/reservation.js";
  import RouteSeats from "../components/RouteSeats.vue";
  import RightArrowIcon from "../components/icons/RightArrowIcon.vue";
  export default {
    name: "RouteDetails",
    props:{
        route_id:{
            required:true
        }
    },
    components:{
        RouteSeats,
        RightArrowIcon,
    },
    data() {
        return {
            route: [],
            seats: 0,
            seatSelected: 0,
            seatsTaken:[],
            restrictedView:false,
            seatByUser:[],
        };
    },
    methods:{
        handleSeatSelected(seatNumber){
            this.seatSelected = seatNumber;
        },
        async reserveRoute(){
            this.token = sessionStorage.getItem("token");
            const reservation = {
                user_id : this.$store.getters['users/getUser'].id,
                route_id : this.route.id,
                status: "Pending",
                seat : this.seatSelected,
            };
            try {
                await Reserve.reserveRoute(reservation, this.token);
                window.location.reload();
            } catch (error) {
                console.error("Error fetching route:", error);
            }
        },
    },
    async beforeMount() {
        this.token = sessionStorage.getItem("token");
        try {
            const response = await Route.getRouteByID(this.route_id, this.token);
            this.route = response;
            this.seats = this.route.passengers_number;
            this.seatsTaken = this.route.takenSeats;
            try{
                this.restrictedView = this.route.driver.id == this.$store.getters['users/getUser'].id? true:this.route.takenSeatByUser !== null;
            }catch(e){
                return false;
            }
            if(this.route.takenSeatByUser){this.seatByUser = this.route.takenSeatByUser;}
        } catch (error) {
            console.error("Error fetching route:", error);
        }
    },
  };
  </script>
  

<style scoped>
    .submit-btn{
        background-color: #808080;
        color:white;
        border: none;
        border-radius: 25px;
        padding: 10px 30px;
        font-size: 16px;
        cursor: pointer;
        outline: none;
        display: inline-block;
        text-align: center;
    }
    .submit-btn:hover{
        background-color: #696969;
    }
    .submit-btn:active {
        background-color: #505050;
    }
    .submit-btn:disabled{
        background-color: #ced6e0;
        cursor:default;
    }
</style>