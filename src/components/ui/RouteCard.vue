<template>
  <div
    class="w-auto h-auto bg-black rounded-3xl flex flex-col justify-center routes-center pt-10 pb-8 cursor-pointer"
    @click="goToCard"
  >
    <div class="bg-black rounded-full flex justify-center routes-center mb-5">
      <div class="w-auto h-auto">
        <p class="text-white font-bold uppercase">
          FROM: {{ this.route.city_from ? this.route.city_from.name : "" }}
        </p>
        <p class="text-white font-bold uppercase">
          TO: {{ this.route.city_to ? this.route.city_to.name : "" }}
        </p>
      </div>
    </div>
    <div
      class="w-auto h-auto flex justify-center items-center mb-5"
      @click.stop="this.$router.push(`/profile/${this.route.driver.id}`)"
    >
      <img
        alt=""
        class="w-10 h-10 rounded-full border border-white/50"
        :src="driverImage()"
      />
      <div class="ml-2">
        <p class="text-white bold mb-0 uppercase">
          {{ this.route.driver ? this.route.driver.first_name : "" }}
          {{ this.route.driver ? this.route.driver.last_name : "" }}
        </p>
        <div class="flex routes-center text-xs">
          <span class="text-yellow-500 mr-1"
            ><span class="flex justify-center w-24">
              <StarIcon
                v-for="starIndex in 5"
                :key="starIndex"
                :color="calculateStarColor(starIndex)"
                :type="calculateStarType(starIndex)"
                class="w-8 my-2"
                strokeColor="white"
              ></StarIcon></span
          ></span>
        </div>
      </div>
    </div>

    <div class="flex justify-center text-white">
      Price: {{ this.route.price ?? "" }}€
    </div>

    <div class="w-auto h-auto flex justify-center routes-center mt-16">
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
import DateUtil from "../../utils/date.js";
import StarIcon from "../icons/StarIcon.vue";

export default {
  name: "RouteCard",
  props: ["route"],
  components: {
    StarIcon,
  },
  data() {
    return {
      DateUtil,
      storageLink: process.env.VUE_APP_STORAGE_URL,
    };
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
        if (
          starNumber - this.route.driver.averageRating > 0.3 &&
          starNumber - this.route.driver.averageRating < 0.7
        ) {
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
        if (
          starNumber - this.route.driver.averageRating > 0.7 &&
          starNumber - this.route.driver.averageRating < 1
        ) {
          return "none";
        }

        if (
          starNumber - this.route.driver.averageRating > 0.3 &&
          starNumber - this.route.driver.averageRating < 0.7
        ) {
          return "white";
        }
        return "none";
      }
    },
    driverImage() {
      console.log(this.route);
      return this.route.driver.profile_picture
        ? `${this.storageLink}/${this.route.driver.profile_picture}`
        : require("../../assets/images/default-user-pic.png");
    },
  },
};
</script>
