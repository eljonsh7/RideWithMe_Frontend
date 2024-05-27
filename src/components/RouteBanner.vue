<template>
  <div
    class="w-2/3 h-auto mx-auto bg-black rounded-3xl flex justify-evenly routes-center py-4 cursor-pointer"
    @click="goToCard"
  >
    <div class="w-auto h-auto flex gap-5 justify-center items-center">
      <div>
        <p class="text-white bold mb-0 uppercase">
          {{ this.route.driver ? this.route.driver.first_name : "" }}
          {{ this.route.driver ? this.route.driver.last_name : "" }}
        </p>
        <div class="flex routes-center text-xs">
          <span class="text-yellow-500 mr-1"><div class="flex justify-center w-24"><star-icon class="w-8 my-2" v-for="starIndex in 5" :key="starIndex" 
        :color="calculateStarColor(starIndex)" strokeColor="white" :type="calculateStarType(starIndex)"></star-icon></div></span>
        </div>
      </div>
    </div>

    <div
      class="bg-black rounded-full flex justify-center items-center routes-center"
    >
      <div class="w-auto h-auto">
        <p class="text-white font-bold uppercase">
          FROM: {{ this.route.city_from ? this.route.city_from.name : "" }}
        </p>
        <p class="text-white font-bold uppercase">
          TO: {{ this.route.city_to ? this.route.city_to.name : "" }}
        </p>
      </div>
    </div>

    <div class="w-auto h-auto flex justify-center routes-center items-center">
      <p class="text-gray-400">
        {{ DateUtil.getDate(this.route.datetime) }} ->
      </p>
      <p class="text-gray-400">
        {{ DateUtil.getTime(this.route.datetime) }}
      </p>
    </div>
  </div>
</template>

<script>
import DateUtil from "../utils/date";
import StarIcon from ".//icons/StarIcon.vue";

export default {
  name: "RouteBanner",
  props: ["route"],
  data() {
    return {
      DateUtil,
    };
  },
  components:{
    StarIcon
  },
  methods: {
    goToCard() {
      if (sessionStorage.getItem("token"))
        this.$router.push(`/route/${this.route.id}`);
      else this.$router.push("/login");
    },
    calculateStarType(starNumber) {
      if (this.route.driver.averageRating) {
        if (starNumber < this.route.driver.averageRating) {
          return "star";
        }
        if (starNumber - this.route.driver.averageRating > 0.3 && starNumber - this.route.driver.averageRating < 0.7) {
          return "half-star";
        }
        if (this.route.driver.averageRating - starNumber <= 0) {
          return "star";
        }

      }
    },
    calculateStarColor(starNumber) {
      if (this.route.driver.averageRating) {
        if (starNumber <= this.route.driver.averageRating) {
          return "white";
        }
        if (starNumber - this.route.driver.averageRating > 0.7 && starNumber - this.route.driver.averageRating < 1) {
          return "none";
        }

        if(starNumber - this.route.driver.averageRating > 0.3 && starNumber - this.route.driver.averageRating < 0.7){
          return "white";
        }
        return "none";
      }
    }
  },
};
</script>
