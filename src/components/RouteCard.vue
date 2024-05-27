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
    <div class="w-auto h-auto flex justify-center items-center mb-5">
      <img
        alt=""
        class="w-10 h-10 rounded-full border border-white/50"
        src="../assets/images/default-user-pic.png"
      />
      <div class="ml-2">
        <p class="text-white bold mb-0 uppercase">
          {{ this.route.driver ? this.route.driver.first_name : "" }}
          {{ this.route.driver ? this.route.driver.last_name : "" }}
        </p>
        <div class="flex routes-center text-xs">
          <span class="text-yellow-500 mr-1">★★★★★</span>
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
import DateUtil from "../utils/date.js";

export default {
  name: "RouteCard",
  props: ["route"],
  data() {
    return {
      DateUtil,
    };
  },
  methods: {
    goToCard() {
      if (sessionStorage.getItem("token"))
        this.$router.push(`/route/${this.route.id}`);
      else this.$router.push("/login");
    },
  },
};
</script>
